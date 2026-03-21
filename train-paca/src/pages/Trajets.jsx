import { useState, useEffect, Suspense, lazy } from "react";
import gares from "../data/gares_paca.js";
import monuments from "../data/monuments_paca.js";
import { haversine, getPOIProches, co2Comparaison, getHorairesGare } from "../utils/geo";
import "./Trajets.css";

const MapView = lazy(() => import("../components/MapView"));

const API_KEY = "4cf5f095-08ec-45c0-9b18-914b10bd8269";

// 6 departements PACA uniquement
const DEPT_ORDER = ["13", "83", "06", "84", "04", "05"];
const DEPT_NOMS = {
  "13": "Bouches-du-Rhone (13)",
  "83": "Var (83)",
  "06": "Alpes-Maritimes (06)",
  "84": "Vaucluse (84)",
  "04": "Alpes-de-Haute-Provence (04)",
  "05": "Hautes-Alpes (05)",
};

const grandes = gares.filter((g) => g.grande);
const petites  = gares.filter((g) => !g.grande && DEPT_ORDER.includes(g.dept));

async function fetchJourneys(fromUic, toUic, date) {
  const dt = date.replace(/-/g, "") + "T060000";
  const url = `https://api.sncf.com/v1/coverage/sncf/journeys?from=stop_area:SNCF:${fromUic}&to=stop_area:SNCF:${toUic}&datetime=${dt}&count=15`;
  const res = await fetch(url, {
    headers: { Authorization: "Basic " + btoa(API_KEY + ":") },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  return data.journeys || [];
}

function parseJourneys(journeys) {
  if (!journeys.length) return null;
  const durations = journeys.map((j) => j.durations?.total || 0).filter(Boolean);
  const deps = journeys
    .map((j) => j.sections?.find((s) => s.type === "public_transport")?.departure_date_time)
    .filter(Boolean).sort();
  const fmt = (dt) => dt ? `${dt.slice(9, 11)}h${dt.slice(11, 13)}` : "--";
  const types = [...new Set(journeys.flatMap((j) =>
    j.sections?.filter(s => s.type === "public_transport")
      .map(s => s.display_informations?.commercial_mode || "") || []
  ))].filter(Boolean);
  return {
    nb: journeys.length,
    dureeMin: Math.round(Math.min(...durations) / 60),
    dureeMax: Math.round(Math.max(...durations) / 60),
    premier: fmt(deps[0]),
    dernier: fmt(deps[deps.length - 1]),
    type: types[0] || "Train",
  };
}

const DUREE_OPTIONS = [
  { label: "Toutes", val: 999 },
  { label: "< 1h",   val: 60  },
  { label: "< 2h",   val: 120 },
  { label: "< 3h",   val: 180 },
];

// Grouper les gares par département puis par ville
function groupParDeptVille(liste, excludeUic) {
  // Exclure la gare choisie ET toutes les gares de la même ville_groupe si c'est une grande ville
  const gareDepart = excludeUic ? liste.find(g => g.uic === excludeUic) || gares.find(g => g.uic === excludeUic) : null;
  const villeDepExclue = gareDepart?.ville_groupe || null;
  const filtree = liste.filter(g => {
    if (g.uic === excludeUic) return false;
    // Si la gare d'arrivée est dans la même ville que le départ → masquer
    if (villeDepExclue && g.ville_groupe === villeDepExclue) return false;
    return true;
  });
  const byDept = {};
  DEPT_ORDER.forEach(d => { byDept[d] = {}; });

  filtree.forEach(g => {
    const dept  = g.dept || "??";
    const ville = g.ville_groupe || g.nom;
    if (!byDept[dept]) byDept[dept] = {};
    if (!byDept[dept][ville]) byDept[dept][ville] = [];
    byDept[dept][ville].push(g);
  });

  return DEPT_ORDER
    .filter(d => Object.keys(byDept[d]).length > 0)
    .map(d => ({
      dept: d,
      label: DEPT_NOMS[d],
      villes: Object.entries(byDept[d])
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([ville, gs]) => ({ ville, gares: gs })),
    }));
}

export default function Trajets() {
  const [departId,    setDepartId]    = useState("");
  const [arriveeId,   setArriveeId]   = useState("");
  const [date,        setDate]        = useState(new Date().toISOString().split("T")[0]);
  const [dureeMax,    setDureeMax]    = useState(120);
  const [loading,     setLoading]     = useState(false);
  const [searched,    setSearched]    = useState(false);
  const [trainInfo,   setTrainInfo]   = useState(null);
  const [trainErreur, setTrainErreur] = useState(false);
  const [monumentsProches, setMonumentsProches] = useState([]);
  const [selectedMon, setSelectedMon] = useState(null);

  const gareDepart  = gares.find(g => g.uic === departId);
  const gareArrivee = gares.find(g => g.uic === arriveeId);
  const distance    = gareDepart && gareArrivee
    ? haversine(gareDepart.lat, gareDepart.lng, gareArrivee.lat, gareArrivee.lng)
    : null;
  const co2 = distance ? co2Comparaison(distance) : null;
  const horairesArrivee = gareArrivee ? getHorairesGare(gareArrivee, date) : null;

  // Filtrer par durée estimée
  const petitesFiltrees = petites.filter(g => {
    if (!gareDepart || dureeMax === 999) return true;
    return haversine(gareDepart.lat, gareDepart.lng, g.lat, g.lng) * 1.5 <= dureeMax;
  });

  // Groupements pour le select
  const groupesFiltres = groupParDeptVille(petitesFiltrees, departId);
  const totalFiltrees  = petitesFiltrees.filter(g => g.uic !== departId).length;

  useEffect(() => {
    if (arriveeId && gareDepart) {
      const g = petites.find(g => g.uic === arriveeId);
      if (g) {
        const dist = haversine(gareDepart.lat, gareDepart.lng, g.lat, g.lng);
        if (dist * 1.5 > dureeMax) setArriveeId("");
      }
    }
  }, [dureeMax, departId]);

  const inverser = () => {
    const tmp = departId; setDepartId(arriveeId); setArriveeId(tmp);
  };

  const handleSearch = async () => {
    if (!departId || !arriveeId || !date) return;
    setLoading(true); setSearched(true);
    setTrainInfo(null); setTrainErreur(false); setSelectedMon(null);

    if (gareArrivee) {
      setMonumentsProches(getPOIProches(monuments, gareArrivee.lat, gareArrivee.lng, 15).slice(0, 30));
    }
    try {
      const journeys = await fetchJourneys(departId, arriveeId, date);
      setTrainInfo(parseJourneys(journeys));
    } catch (e) {
      console.error(e); setTrainErreur(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="trajets-page">
      {/* ── GAUCHE ── */}
      <div className="trajets-left">

        <div className="trajets-title">
          <h1>Explorer la <span>Provence</span> en train</h1>
          <p>Horaires SNCF temps reel, empreinte carbone ADEME 2024 et patrimoine culturel.</p>
          <div className="source-badge">
            <span className="dot green" /> SNCF Open Data · DATAtourisme · ADEME 2024
          </div>
        </div>

        <div className="search-panel">

          {/* Filtre durée */}
          <div className="duree-filtre">
            <label>DUREE MAX DU TRAJET</label>
            <div className="duree-btns">
              {DUREE_OPTIONS.map(opt => (
                <button key={opt.val}
                  className={`duree-btn ${dureeMax === opt.val ? "actif" : ""}`}
                  onClick={() => setDureeMax(opt.val)}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Départ */}
          <div className="form-group">
            <label>DEPART — Grandes villes PACA</label>
            <select value={departId} onChange={e => { setDepartId(e.target.value); setArriveeId(""); setSearched(false); }}>
              <option value="">-- Choisir une gare de depart --</option>
              {(() => {
                const villes = {};
                grandes.forEach(g => {
                  const v = g.ville_depart || g.ville_groupe;
                  if (!villes[v]) villes[v] = [];
                  villes[v].push(g);
                });
                return Object.entries(villes).sort().map(([ville, gs]) =>
                  gs.length === 1
                    ? <option key={gs[0].uic} value={gs[0].uic}>{gs[0].nom}</option>
                    : <optgroup key={ville} label={`📍 ${ville}`}>
                        {gs.map(g => <option key={g.uic} value={g.uic}>{g.nom}</option>)}
                      </optgroup>
                );
              })()}
            </select>
          </div>

          <button className="btn-inverser" onClick={inverser}>⇄ inverser</button>

          {/* Arrivée groupée par département puis ville */}
          <div className="form-group">
            <label>ARRIVEE — Petites villes PACA
              <span className="label-count"> ({totalFiltrees} gares)</span>
            </label>
            <select value={arriveeId} onChange={e => setArriveeId(e.target.value)}>
              <option value="">-- Choisir une destination --</option>
              {groupesFiltres.map(({ dept, label, villes }) => (
                <optgroup key={dept} label={`── ${label} ──`}>
                  {villes.map(({ ville, gares: gs }) =>
                    gs.length === 1
                      ? <option key={gs[0].uic} value={gs[0].uic}>
                          {ville}
                        </option>
                      : [
                          <option key={`${ville}-header`} disabled>
                            {`📍 ${ville}`}
                          </option>,
                          ...gs.map(g => (
                            <option key={g.uic} value={g.uic}>
                              {`   ↳ ${g.nom}`}
                            </option>
                          ))
                        ]
                  )}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label>DATE DU VOYAGE</label>
            <input type="date" value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={e => setDate(e.target.value)} />
          </div>

          <button className="btn-search" onClick={handleSearch}
            disabled={!departId || !arriveeId || loading}>
            {loading ? "Recherche en cours..." : "CALCULER LE TRAJET"}
          </button>
        </div>

        {horairesArrivee && (
          <div className="horaires-band">
            Horaires guichet gare d'arrivee : <strong>{horairesArrivee}</strong>
          </div>
        )}

        {/* ── RÉSULTATS ── */}
        {searched && distance && (
          <div className="result-panel">

            {gareDepart && gareArrivee && (
              <div className="result-header">
                <span>{gareDepart.nom.toUpperCase()} → {gareArrivee.nom.toUpperCase()}</span>
                {trainInfo && <span className="badge-type">{trainInfo.type}</span>}
              </div>
            )}

            {!trainInfo && !trainErreur && <div className="result-loading">Recuperation des horaires SNCF...</div>}
            {trainErreur && <div className="result-warning">Horaires SNCF indisponibles — Distance et CO₂ calcules.</div>}
            {trainInfo && trainInfo.nb === 0 && <div className="result-warning">Aucun trajet direct trouve pour cette date.</div>}

            {trainInfo && trainInfo.nb > 0 && (
              <div className="result-duree">
                <span className="duree-num">
                  {trainInfo.dureeMin === trainInfo.dureeMax
                    ? `${trainInfo.dureeMin} min`
                    : `${trainInfo.dureeMin}–${trainInfo.dureeMax} min`}
                </span>
                <span className="duree-label">DUREE ESTIMEE</span>
              </div>
            )}

            <div className="result-stats">
              <div className="result-stat">
                <span className="stat-val">{Math.round(distance)} km</span>
                <span className="stat-lbl">distance GPS</span>
              </div>
              {trainInfo && trainInfo.nb > 0 && (
                <>
                  <div className="result-stat">
                    <span className="stat-val">{trainInfo.nb}</span>
                    <span className="stat-lbl">trains / jour</span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-val">{trainInfo.premier}</span>
                    <span className="stat-lbl">premier depart</span>
                  </div>
                  <div className="result-stat">
                    <span className="stat-val">{trainInfo.dernier}</span>
                    <span className="stat-lbl">dernier depart</span>
                  </div>
                </>
              )}
            </div>

            {/* Monuments entre trajet et CO2 */}
            {monumentsProches.length > 0 && (
              <div className="monuments-inline">
                <h4>🏛️ Monuments a decouvrir ({monumentsProches.length})</h4>
                <div className="monuments-list">
                  {monumentsProches.map((m, i) => (
                    <div key={i}
                      className={`monument-item ${selectedMon === i ? "selected" : ""}`}
                      onClick={() => setSelectedMon(selectedMon === i ? null : i)}>
                      <div className="monument-nom">🏛️ {m.nom}</div>
                      <div className="monument-info">{m.distance.toFixed(1)} km · {m.commune || ""}</div>
                      {selectedMon === i && m.description && (
                        <p className="monument-desc">{m.description.slice(0, 180)}…</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CO2 ADEME 2024 */}
            {co2 && (
              <div className="co2-panel">
                <h4>🌿 Empreinte carbone — ADEME 2024</h4>
                {[
                  { label: "🚆 Train",   val: co2.train,   cls: "train",   max: co2.voiture },
                  { label: "🚗 Voiture", val: co2.voiture, cls: "voiture", max: co2.voiture },
                ].map(item => (
                  <div key={item.cls} className="co2-row">
                    <span className="co2-lbl">{item.label}</span>
                    <div className="co2-bar-wrap">
                      <div className={`co2-bar ${item.cls}`}
                        style={{ width: `${Math.max(4, Math.round(item.val / item.max * 100))}%` }} />
                    </div>
                    <span className="co2-val">
                      {item.val >= 1000 ? `${(item.val / 1000).toFixed(1)} kg` : `${item.val} g`}
                    </span>
                  </div>
                ))}
                <p className="co2-note">
                  Le train emet <strong>{Math.round(co2.voiture / co2.train)}x</strong> moins de CO₂.
                  <span className="ademe-ref"> Base Carbone ADEME 2024</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── CARTE DROITE ── */}
      <div className="trajets-right">
        <Suspense fallback={<div className="map-loading">Chargement de la carte…</div>}>
          <MapView
            gareDepart={gareDepart}
            gareArrivee={gareArrivee}
            monuments={searched ? monumentsProches : []}
            highlightMon={selectedMon !== null ? monumentsProches[selectedMon] : null}
          />
        </Suspense>
      </div>
    </div>
  );
}
