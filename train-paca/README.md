# 🚂 TrainPACA — Explorer la Provence en train

> Projet réalisé dans le cadre de l'**Open Data University Saison 4** — Fondation SNCF  
> Thématique : *"Comment faciliter et encourager le tourisme en train en France ?"*

---

## 🎯 Objectif

TrainPACA est une application web interactive qui permet aux voyageurs de **découvrir la région PACA en train** en combinant :
- Les **horaires SNCF en temps réel**
- L'**empreinte carbone** des trajets (référentiel ADEME 2024)
- Le **patrimoine culturel** des destinations (monuments DATAtourisme)

---

## 🗂️ Structure du projet

```
train-paca/
├── public/                  # Fichiers statiques
├── src/
│   ├── pages/
│   │   ├── Home.jsx         # Page d'accueil
│   │   ├── CartePACA.jsx    # Page cartes interactives
│   │   └── Trajets.jsx      # Page recherche de trajets
│   ├── components/
│   │   ├── Navbar.jsx       # Barre de navigation
│   │   ├── MapView.jsx      # Carte Leaflet interactive
│   │   ├── SearchForm.jsx   # Formulaire de recherche
│   │   ├── TripInfo.jsx     # Informations du trajet
│   │   └── POIPanel.jsx     # Panneau points d'intérêt
│   ├── data/
│   │   ├── gares_paca.js    # 97 gares PACA (départs + arrivées)
│   │   └── monuments_paca.js # 4 461 monuments DATAtourisme
│   ├── utils/
│   │   └── geo.js           # Calculs distance, CO₂, POI
│   └── i18n/                # Traductions FR/EN
├── index.html
├── package.json
└── vite.config.js
```

---

## 📄 Pages

### 🏠 Page 1 — Accueil (`/`)
- Présentation du projet TrainPACA
- Statistiques clés : 30+ gares, ×126 moins de CO₂, 4 461 monuments, 6 départements
- Comparatif empreinte carbone Train vs Voiture (ADEME 2024)
- Sources de données utilisées

### 🗺️ Page 2 — Cartes PACA (`/carte`)
- Visualisation du réseau ferroviaire PACA
- Cartes des monuments culturels
- Statistiques par département
- Viewer de cartes HTML interactives

### 🚆 Page 3 — Trajets (`/trajets`)
- **Point de départ** : 8 grandes villes PACA avec leurs gares
  - Marseille (Saint-Charles + Blancarde)
  - Aix-en-Provence (TGV + Centre)
  - Nice, Toulon, Avignon Centre, Cannes, Antibes, Arles
- **Point d'arrivée** : 88 villes / 96 gares organisées par département puis par ville
  - Bouches-du-Rhône (13) — 26 villes
  - Var (83) — 18 villes
  - Alpes-Maritimes (06) — 16 villes
  - Vaucluse (84) — 14 villes
  - Alpes-de-Haute-Provence (04) — 5 villes
  - Hautes-Alpes (05) — 9 villes
- **Filtre durée** : Toutes / < 1h / < 2h / < 3h
- **Horaires SNCF** en temps réel via API Navitia
- **Empreinte carbone** Train vs Voiture (ADEME 2024)
- **Monuments culturels** proches de la gare d'arrivée (DATAtourisme)
- **Carte interactive** avec marqueurs gares + monuments

---

## 🛠️ Stack technique

| Technologie | Usage |
|-------------|-------|
| React 18 + Vite | Framework frontend |
| React Router v6 | Navigation entre pages |
| Leaflet + React-Leaflet | Carte interactive |
| react-i18next | Internationalisation FR/EN |
| API SNCF / Navitia | Horaires temps réel |
| DATAtourisme | Base de données POI |

---

## 📊 Sources de données

| Source | Description |
|--------|-------------|
| **SNCF Open Data** | Dataset officiel des gares voyageurs (2 782 gares France) |
| **API Navitia** | Horaires SNCF temps réel, calcul de trajets |
| **DATAtourisme** | 21 347 POI région PACA (monuments, restaurants, hôtels) |
| **ADEME Base Carbone 2024** | Facteurs d'émission CO₂ (train : 1,73g/km, voiture : 218g/km) |
| **data.gouv.fr** | Lignes ferroviaires par région administrative |

---

## ⚙️ Installation et lancement

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev
# → http://localhost:5173/

# Build pour production
npm run build
```

---

## 🌿 Impact environnemental

Le train émet **126x moins de CO₂** que la voiture — ce ratio est constant car basé sur les facteurs fixes ADEME 2024 :

| Transport | Facteur CO₂ (par km) |
|-----------|---------------------|
| 🚆 Train | 1,73 g/km |
| 🚗 Voiture | 218 g/km |

> Le site calcule dynamiquement la quantité exacte de CO₂ économisée pour chaque trajet selon sa distance réelle.

*Source : Base Carbone ADEME 2024*

---

## 👥 Équipe

Projet réalisé par **Fida Mars**, **Andrea Grasso**, **Asia Redaelli** et **Leila El Mabrouk** dans le cadre de l'Open Data University Saison 4 — Fondation SNCF.
