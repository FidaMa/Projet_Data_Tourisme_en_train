import { useTranslation } from "react-i18next";
import gares from "../data/gares_paca.json";
import "./SearchForm.css";

export default function SearchForm({ depart, arrivee, date, onDepart, onArrivee, onDate, onSearch, loading }) {
  const { t } = useTranslation();

  const garandes = gares.filter((g) => g.grande);
  const petites = gares.filter((g) => !g.grande);

  const garrivee = gares.filter((g) => g.id !== depart);

  return (
    <div className="search-form">
      <h2>{t("trajets.titre")}</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>{t("trajets.depart")}</label>
          <select value={depart} onChange={(e) => onDepart(e.target.value)}>
            <option value="">-- {t("trajets.depart")} --</option>
            <optgroup label="Grandes villes">
              {garandes.map((g) => (
                <option key={g.id} value={g.id}>{g.nom}</option>
              ))}
            </optgroup>
            <optgroup label="Petites villes">
              {petites.map((g) => (
                <option key={g.id} value={g.id}>{g.nom}</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="form-group">
          <label>{t("trajets.arrivee")}</label>
          <select value={arrivee} onChange={(e) => onArrivee(e.target.value)} disabled={!depart}>
            <option value="">-- {t("trajets.arrivee")} --</option>
            {garrivee.map((g) => (
              <option key={g.id} value={g.id}>{g.nom}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t("trajets.date")}</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => onDate(e.target.value)}
          />
        </div>

        <button
          className="btn-search"
          onClick={onSearch}
          disabled={!depart || !arrivee || !date || loading}
        >
          {loading ? "⏳" : "🔍"} {loading ? t("trajets.chargement") : t("trajets.chercher")}
        </button>
      </div>
    </div>
  );
}
