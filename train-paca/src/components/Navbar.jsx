import { NavLink } from "react-router-dom";
import i18n from "../i18n";
import "./Navbar.css";

export default function Navbar() {
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-logo">🚆</span>
        <span className="nav-title">TrainPACA</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Accueil
        </NavLink>
        <NavLink to="/carte" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Cartes PACA
        </NavLink>
        <NavLink to="/trajets" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Trajets
        </NavLink>
      </div>
      <button className="lang-btn" onClick={toggleLang}>
        {i18n.language === "fr" ? "🇬🇧 EN" : "🇫🇷 FR"}
      </button>
    </nav>
  );
}
