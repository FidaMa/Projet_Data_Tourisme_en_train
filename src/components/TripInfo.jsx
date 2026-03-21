import { useTranslation } from "react-i18next";
import { co2Comparaison } from "../utils/geo";
import "./TripInfo.css";

export default function TripInfo({ distance, trainInfo, erreur }) {
  const { t } = useTranslation();

  if (erreur) {
    return (
      <div className="trip-info trip-erreur">
        ⚠️ {t("trajets.erreur_api")}
      </div>
    );
  }

  if (!distance) return null;

  const co2 = co2Comparaison(distance);
  const maxCo2 = co2.avion;

  return (
    <div className="trip-info">
      {/* Distance + durée */}
      <div className="info-row">
        <div className="info-bloc">
          <span className="info-icon">📏</span>
          <div>
            <div className="info-val">{Math.round(distance)} km</div>
            <div className="info-label">{t("trajets.distance")}</div>
          </div>
        </div>

        {trainInfo ? (
          <>
            <div className="info-bloc">
              <span className="info-icon">⏱️</span>
              <div>
                <div className="info-val">
                  {trainInfo.dureeMin === trainInfo.dureeMax
                    ? `${trainInfo.dureeMin} min`
                    : `${trainInfo.dureeMin}–${trainInfo.dureeMax} min`}
                </div>
                <div className="info-label">{t("trajets.duree")}</div>
              </div>
            </div>
            <div className="info-bloc">
              <span className="info-icon">🚆</span>
              <div>
                <div className="info-val">{trainInfo.nb} {t("trajets.nb_trains")}</div>
                <div className="info-label">
                  {t("trajets.premier")} {trainInfo.premier} · {t("trajets.dernier")} {trainInfo.dernier}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="info-bloc loading-bloc">
            <span className="spinner" /> Récupération des horaires...
          </div>
        )}
      </div>

      {/* CO2 */}
      <div className="co2-bloc">
        <h3>{t("trajets.co2_titre")}</h3>
        <div className="co2-list">
          {[
            { label: t("trajets.co2_train"), val: co2.train, icon: "🚆", cls: "train" },
            { label: t("trajets.co2_voiture"), val: co2.voiture, icon: "🚗", cls: "voiture" },
            { label: t("trajets.co2_avion"), val: co2.avion, icon: "✈️", cls: "avion" },
          ].map((item) => (
            <div key={item.cls} className="co2-row">
              <span className="co2-mode-lbl">{item.icon} {item.label}</span>
              <div className="co2-bar-wrap">
                <div
                  className={`co2-bar ${item.cls}`}
                  style={{ width: `${Math.round((item.val / maxCo2) * 100)}%` }}
                />
              </div>
              <span className="co2-grams">{item.val.toLocaleString()} g</span>
            </div>
          ))}
        </div>
        <p className="co2-note">
          🌿 Le train émet <strong>{Math.round(co2.voiture / co2.train)}×</strong> moins de CO₂ que la voiture pour ce trajet.
        </p>
      </div>
    </div>
  );
}
