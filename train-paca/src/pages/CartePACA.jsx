import { useState } from "react";
import "./CartePACA.css";

const CARTES = [
  {
    id: "culture_gares",
    titre: "Lieux culturels & gares PACA",
    description: "Carte combinée : 935 lieux culturels Basilic et le réseau de gares ferroviaires PACA — filtrés par communes desservies par le réseau SNCF.",
    icon: "🏛️",
    fichier: "/cartes/paca_lieux_culturels_avec_gares.html",
    source: "Basilic · data.gouv.fr",
    nb: "935 lieux culturels · 135 gares",
  },
  {
    id: "gares",
    titre: "Réseau ferroviaire PACA",
    description: "Cartographie des gares et lignes ferroviaires de la région avec tracé des lignes.",
    icon: "🚉",
    fichier: "/cartes/carte_gares_lignes_couleurs_foncees.html",
    source: "SNCF Open Data",
    nb: "135 gares · 6 départements",
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
                {carte.nb && <div className="carte-tab-badge">{carte.nb}</div>}
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
            { dept: "Bouches-du-Rhône (13)", gares: 30, poi: 478, emoji: "🌅" },
            { dept: "Var (83)", gares: 19, poi: 155, emoji: "⚓" },
            { dept: "Alpes-Maritimes (06)", gares: 18, poi: 215, emoji: "🌊" },
            { dept: "Vaucluse (84)", gares: 15, poi: 351, emoji: "🍇" },
            { dept: "Alpes-de-Haute-Provence (04)", gares: 5, poi: 40, emoji: "🏔️" },
            { dept: "Hautes-Alpes (05)", gares: 9, poi: 77, emoji: "🎿" },
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
