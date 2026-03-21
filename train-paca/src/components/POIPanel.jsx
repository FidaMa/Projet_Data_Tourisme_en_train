import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./POIPanel.css";

const CAT_ICONS = {
  monument: "🏛️",
  restaurant: "🍽️",
  hotel: "🏨",
};

const CAT_COLORS = {
  monument: "#6f42c1",
  restaurant: "#fd7e14",
  hotel: "#0d6efd",
};

export default function POIPanel({ pois, onSelectPOI, selectedPOI }) {
  const { t } = useTranslation();
  const [filtre, setFiltre] = useState("tous");

  const filtres = [
    { key: "tous", label: t("trajets.filtre_tous") },
    { key: "monument", label: t("trajets.filtre_monument") },
    { key: "restaurant", label: t("trajets.filtre_restaurant") },
    { key: "hotel", label: t("trajets.filtre_hotel") },
  ];

  const poisFiltres = filtre === "tous" ? pois : pois.filter((p) => p.categorie === filtre);

  if (!pois.length) return null;

  return (
    <div className="poi-panel">
      <h3>{t("trajets.poi_titre")} <span className="poi-count">({pois.length})</span></h3>

      <div className="filtres">
        {filtres.map((f) => (
          <button
            key={f.key}
            className={`filtre-btn ${filtre === f.key ? "actif" : ""}`}
            onClick={() => setFiltre(f.key)}
          >
            {f.key !== "tous" && CAT_ICONS[f.key]} {f.label}
          </button>
        ))}
      </div>

      <div className="poi-list">
        {poisFiltres.slice(0, 30).map((poi, i) => (
          <div
            key={i}
            className={`poi-item ${selectedPOI === i ? "selected" : ""}`}
            onClick={() => onSelectPOI(poi, i)}
            style={{ borderLeftColor: CAT_COLORS[poi.categorie] }}
          >
            <div className="poi-header">
              <span className="poi-icon">{CAT_ICONS[poi.categorie]}</span>
              <span className="poi-nom">{poi.nom}</span>
              <span className="poi-dist">{poi.distance.toFixed(1)} km {t("trajets.distance_gare")}</span>
            </div>
            {poi.description && (
              <p className="poi-desc">{poi.description.slice(0, 120)}{poi.description.length > 120 ? "…" : ""}</p>
            )}
          </div>
        ))}
        {poisFiltres.length > 30 && (
          <p className="poi-more">+ {poisFiltres.length - 30} autres résultats</p>
        )}
      </div>
    </div>
  );
}
