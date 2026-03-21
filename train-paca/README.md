# 🚆 TrainPACA — Tourisme durable en train

Application React pour découvrir les petites villes de PACA accessibles en train depuis Marseille et les grandes villes de la région.

## Installation

```bash
npm install
npm run dev
```

## Clé API SNCF

Dans `src/utils/sncfApi.js`, la clé est déjà configurée :
```
4cf5f095-08ec-45c0-9b18-914b10bd8269
```

## Pages

- `/` — Accueil (contexte, stats CO₂)
- `/carte` — Carte régionale PACA (intégrez vos cartes ici)
- `/trajets` — Application principale : recherche de trajets, carte Leaflet, POI

## Page 2 — Intégration de vos cartes

Dans `src/pages/CartePACA.jsx`, remplacez la zone `<div className="carte-placeholder">` par :
```jsx
<iframe src="URL_DE_VOTRE_CARTE" title="Carte PACA" />
```

## Données

- `src/data/gares_paca.json` — 30 gares PACA avec coordonnées GPS
- `src/data/poi_paca.json` — 21 347 POI DATAtourisme (monuments, restaurants, hôtels)

## Stack technique

- React 18 + Vite
- React Router v6
- Leaflet + React-Leaflet (carte interactive)
- react-i18next (FR/EN)
- API SNCF Navitia (horaires temps réel)
- DATAtourisme (POI open data)
