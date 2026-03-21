import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const fr = {
  nav: { accueil: "Accueil", carte: "Carte PACA", trajets: "Trajets" },
  home: {
    titre: "Voyagez en train en PACA",
    soustitre: "Découvrez les trésors de Provence-Alpes-Côte d'Azur autrement",
    cta: "Trouver un trajet",
    stat1: "gares en PACA", stat2: "moins de CO₂ qu'en voiture", stat3: "POI touristiques",
    section_pourquoi: "Pourquoi voyager en train ?",
    arg1_titre: "Empreinte carbone réduite", arg1_texte: "Un trajet en train émet jusqu'à 20 fois moins de CO₂ qu'en voiture.",
    arg2_titre: "Destinations insolites", arg2_texte: "Accédez à des petites villes pleines de charme.",
    arg3_titre: "Confort & détente", arg3_texte: "Profitez du paysage provençal sans le stress de la conduite."
  },
  trajets: {
    titre: "Planifier un trajet", depart: "Gare de départ", arrivee: "Gare d'arrivée",
    date: "Date du voyage", chercher: "Rechercher", distance: "Distance",
    duree: "Durée estimée", nb_trains: "trains disponibles", premier: "Premier", dernier: "Dernier",
    co2_titre: "Empreinte carbone", co2_train: "Train", co2_voiture: "Voiture", co2_avion: "Avion",
    poi_titre: "À découvrir à l'arrivée", filtre_tous: "Tous", filtre_monument: "Monuments",
    filtre_restaurant: "Restaurants", filtre_hotel: "Hôtels", distance_gare: "de la gare",
    chargement: "Chargement...", erreur_api: "Impossible de récupérer les horaires.",
    aucun_trajet: "Aucun trajet direct trouvé.", selectionnez: "Sélectionnez une gare de départ et d'arrivée"
  },
  carte: { titre: "Carte touristique PACA" }
};

const en = {
  nav: { accueil: "Home", carte: "PACA Map", trajets: "Journeys" },
  home: {
    titre: "Travel by Train in PACA",
    soustitre: "Discover the treasures of Provence-Alpes-Côte d'Azur differently",
    cta: "Find a journey",
    stat1: "stations in PACA", stat2: "less CO₂ than by car", stat3: "tourist attractions",
    section_pourquoi: "Why travel by train?",
    arg1_titre: "Lower carbon footprint", arg1_texte: "A train journey emits up to 20x less CO₂ than a car.",
    arg2_titre: "Unique destinations", arg2_texte: "Access charming small towns hard to reach otherwise.",
    arg3_titre: "Comfort & relaxation", arg3_texte: "Enjoy the Provençal landscape without driving stress."
  },
  trajets: {
    titre: "Plan a journey", depart: "Departure station", arrivee: "Arrival station",
    date: "Travel date", chercher: "Search", distance: "Distance",
    duree: "Estimated duration", nb_trains: "trains available", premier: "First", dernier: "Last",
    co2_titre: "Carbon footprint", co2_train: "Train", co2_voiture: "Car", co2_avion: "Plane",
    poi_titre: "Things to discover on arrival", filtre_tous: "All", filtre_monument: "Monuments",
    filtre_restaurant: "Restaurants", filtre_hotel: "Hotels", distance_gare: "from station",
    chargement: "Loading...", erreur_api: "Unable to fetch schedules.",
    aucun_trajet: "No direct train found.", selectionnez: "Select a departure and arrival station"
  },
  carte: { titre: "PACA Tourist Map" }
};

i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr }, en: { translation: en } },
  lng: "fr",
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
  initImmediate: false,
});

export default i18n;
