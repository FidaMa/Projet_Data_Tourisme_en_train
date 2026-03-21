import { useState } from "react";
import "./CartePACA.css";

const CARTES = [
  {
    id: "monuments",
    titre: "Monuments & sites culturels",
    description: "Monuments nationaux, musées et sites classés accessibles depuis les gares PACA.",
    icon: "🏛️",
    fichier: null, // Remplacez par : "/cartes/monuments.html"
  },
  {
    id: "gares",
    titre: "Réseau ferroviaire PACA",
    description: "Cartographie des gares et lignes ferroviaires de la région avec densité de trafic.",
    icon: "🚉",
    fichier: null, // Remplacez par : "/cartes/gares.html"
  },
  {
    id: "isochrone",
    titre: "Zones isochrones depuis Marseille",
    description: "Destinations accessibles en moins de 1h, 2h et 3h en train depuis Marseille.",
    icon: "⏱️",
    fichier: null, // Remplacez par : "/cartes/isochrone.html"
  },
  {
    id: "tourisme",
    titre: "Densité touristique par commune",
    description: "Carte de chaleur des points d'intérêt touristiques par commune en PACA.",
    icon: "📍",
    fichier: null, // Remplacez par : "/cartes/tourisme.html"
  },
];

export default function CartePACA() {
  const [carteActive, setCarteActive] = useState(CARTES[0]);

  return (
    <div className="carte-paca">
      <div className="carte-header">
        <h1>📊 Cartes & visualisations PACA</h1>
        <p>Explorez nos analyses cartographiques du tourisme ferroviaire en Provence-Alpes-Côte d'Azur</p>
      </div>

      <div className="carte-layout">
        {/* Sidebar */}
        <div className="carte-sidebar">
          {CARTES.map((carte) => (
            <button
              key={carte.id}
              className={`carte-tab ${carteActive.id === carte.id ? "actif" : ""}`}
              onClick={() => setCarteActive(carte)}
            >
              <span className="carte-tab-icon">{carte.icon}</span>
              <div>
                <div className="carte-tab-titre">{carte.titre}</div>
                <div className="carte-tab-desc">{carte.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Contenu carte */}
        <div className="carte-viewer">
          <div className="carte-viewer-header">
            <span>{carteActive.icon}</span>
            <h2>{carteActive.titre}</h2>
          </div>

          {carteActive.fichier ? (
            <iframe
              src={carteActive.fichier}
              title={carteActive.titre}
              className="carte-iframe"
            />
          ) : (
            <div className="carte-placeholder">
              <div className="placeholder-big-icon">{carteActive.icon}</div>
              <h3>Intégrez votre carte ici</h3>
              <p>
                Copiez votre fichier HTML dans le dossier <code>public/cartes/</code> du projet,
                puis mettez à jour le champ <code>fichier</code> dans <code>CartePACA.jsx</code>.
              </p>
              <div className="placeholder-code">
                <code>fichier: "/cartes/{carteActive.id}.html"</code>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats régionales */}
      <div className="region-stats">
        <h2>La région en chiffres</h2>
        <div className="region-grid">
          {[
            { dept: "Bouches-du-Rhône (13)", gares: 18, poi: 5200, emoji: "🌅" },
            { dept: "Var (83)", gares: 22, poi: 4800, emoji: "⚓" },
            { dept: "Vaucluse (84)", gares: 12, poi: 2900, emoji: "🍇" },
            { dept: "Alpes-de-Haute-Provence (04)", gares: 8, poi: 1500, emoji: "🏔️" },
            { dept: "Hautes-Alpes (05)", gares: 5, poi: 1300, emoji: "🎿" },
            { dept: "Alpes-Maritimes (06)", gares: 14, poi: 5600, emoji: "🌊" },
          ].map((d) => (
            <div key={d.dept} className="dept-card">
              <span className="dept-emoji">{d.emoji}</span>
              <div className="dept-info">
                <strong>{d.dept}</strong>
                <div className="dept-stats">
                  <span>🚉 {d.gares} gares</span>
                  <span>📍 ~{d.poi.toLocaleString()} POI</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
