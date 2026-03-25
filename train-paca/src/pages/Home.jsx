import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🚆 Open Data University × SNCF — Saison 4</div>
          <h1>Explorer la <span className="hero-accent">Provence</span> en train</h1>
          <p>
            Une application web interactive pour promouvoir le tourisme durable en train
            depuis les grandes villes de PACA vers les petites villes riches en patrimoine.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate("/trajets")}>
              🗺️ Planifier un trajet
            </button>
            <button className="btn-secondary" onClick={() => navigate("/carte")}>
              📊 Voir les cartes
            </button>
          </div>
          <div className="hero-tags">
            <span>SNCF Open Data</span>
            <span>Basilic</span>
            <span>OpenStreetMap</span>
            <span>React + Leaflet</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="train-anim">🚄</div>
          <div className="hero-map-bg" />
        </div>
      </section>

      {/* STATS */}
      <section className="stats-band">
        <div className="stat-item">
          <span className="stat-num">88</span>
          <span className="stat-label">Villes d'arrivée</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">×126</span>
          <span className="stat-label">Moins de CO₂ qu'en voiture</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">3 255</span>
          <span className="stat-label">Lieux touristiques près des gares</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-num">6</span>
          <span className="stat-label">Départements couverts</span>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="description">
        <div className="desc-text">
          <h2>À propos du projet</h2>
          <p>
            Ce projet répond à la problématique posée par la <strong>Fondation SNCF</strong> dans
            le cadre de l'Open Data University : <em>comment faciliter et encourager le tourisme
            en train en France ?</em>
          </p>
          <p>
            Nous avons développé une application centrée sur la région <strong>Provence-Alpes-Côte d'Azur</strong>,
            permettant aux voyageurs de découvrir des petites villes accessibles en moins de 2h
            depuis Marseille et les grandes villes de PACA — en mettant en valeur leurs richesses
            culturelles et patrimoniales.
          </p>
          <p>
            Le transport représente <strong>69% de l'empreinte carbone du tourisme</strong> en France.
            Un trajet de 500 km en train émet presque 10 fois moins de CO₂ qu'en voiture individuelle.
            Notre application vise à rendre ces alternatives visibles et attractives.
          </p>
        </div>
        <div className="desc-visual">
          <div className="co2-card">
            <h3>🌿 Impact CO₂ — 100 km (ADEME 2024)</h3>
            <div className="co2-item">
              <span>🚆 Train</span>
              <div className="co2-bar-wrap"><div className="co2-bar train" style={{width:"1%"}}/></div>
              <span>173g</span>
            </div>
            <div className="co2-item">
              <span>🚗 Voiture</span>
              <div className="co2-bar-wrap"><div className="co2-bar voiture" style={{width:"100%"}}/></div>
              <span>21 800g</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU DU SITE */}
      <section className="contenu">
        <h2>Ce que vous trouverez sur ce site</h2>
        <div className="contenu-grid">
          <div className="contenu-card" onClick={() => navigate("/carte")}>
            <div className="contenu-icon">🗺️</div>
            <h3>Cartes interactives PACA</h3>
            <p>
              Visualisez les monuments touristiques par région, le réseau ferroviaire
              et le nombre de gares par département en PACA.
            </p>
            <span className="contenu-link">Voir les cartes →</span>
          </div>
          <div className="contenu-card featured" onClick={() => navigate("/trajets")}>
            <div className="contenu-icon">🚆</div>
            <h3>Application de trajets</h3>
            <p>
              Choisissez votre gare de départ et d'arrivée, consultez les horaires SNCF
              en temps réel, la distance, l'empreinte carbone et les points d'intérêt
              touristiques autour de la gare d'arrivée.
            </p>
            <span className="contenu-link">Planifier un trajet →</span>
          </div>
          <div className="contenu-card">
            <div className="contenu-icon">📍</div>
            <h3>Points d'intérêt</h3>
            <p>
              Monuments historiques, musées, hôtels et restaurants géolocalisés
              autour de chaque gare d'arrivée, issus de Basilic (Base des Lieux et Équipements Culturels, data.gouv.fr).
            </p>
            <span className="contenu-link">Source : Basilic · data.gouv.fr</span>
          </div>
        </div>
      </section>

      {/* DONNÉES */}
      <section className="donnees">
        <h2>Sources de données ouvertes</h2>
        <div className="donnees-grid">
          {[
            { icon: "🚉", titre: "API SNCF / Navitia", desc: "Horaires, gares, trajets en temps réel", lien: "api.sncf.com" },
            { icon: "🏛️", titre: "Basilic", desc: "3 255 lieux touristiques PACA (data.gouv.fr)", lien: "data.gouv.fr" },
            { icon: "🗺️", titre: "OpenStreetMap", desc: "Fond de carte et tracés ferroviaires", lien: "openstreetmap.org" },
            { icon: "📊", titre: "data.gouv.fr", desc: "Défi Open Data University SNCF", lien: "defis.data.gouv.fr" },
          ].map((d) => (
            <div key={d.titre} className="donnee-card">
              <span className="donnee-icon">{d.icon}</span>
              <div>
                <strong>{d.titre}</strong>
                <p>{d.desc}</p>
                <code>{d.lien}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="footer-cta">
        <h2>Prêt à explorer la Provence en train ?</h2>
        <button className="btn-primary large" onClick={() => navigate("/trajets")}>
          🚆 Commencer l'exploration
        </button>
      </section>
    </div>
  );
}
