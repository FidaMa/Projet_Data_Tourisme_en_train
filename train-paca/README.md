# TrainPACA — Site Web React

Application web de tourisme ferroviaire en région PACA.
Projet ADAD — Open Data University Saison 4 · Fondation SNCF

**Équipe** : Fida Mars · Andrea Grasso · Asia Redaelli · Leila El Mabrouk

---

## Stack technique
- **React 18 + Vite** — framework frontend + build optimisé
- **Leaflet / React-Leaflet** — carte interactive OpenStreetMap
- **React Router v6** — navigation entre les 3 pages
- **API SNCF / Navitia** — horaires trains temps réel
- **Basilic (data.gouv.fr)** — lieux culturels touristiques PACA
- **ADEME Base Carbone 2024** — facteurs CO₂ officiels

---

## Installation
```bash
cd train-paca
npm install
npm run dev
```

---

## Pages

### Page 1 — Accueil
- Présentation du projet et objectifs
- Stats clés : 88 villes · ×126 CO₂ · 3 255 lieux · 6 départements
- Section "Comment ça marche"
- Sources de données
- Chiffres par département PACA

### Page 2 — Cartes PACA
- Carte combinée : 935 lieux culturels Basilic + réseau de gares (Folium)
- Carte réseau ferroviaire PACA avec lignes colorées (Folium)
- Section "La région en chiffres" par département

### Page 3 — Trajets *(page principale)*
- Sélection départ : 5 grandes villes / 7 gares
- Sélection arrivée : 88 villes / 96 gares (organisées par département)
- Filtre durée : Toutes / <1h / <2h / <3h
- Horaires SNCF temps réel via API Navitia
- Distance réelle ferroviaire depuis l'API
- Empreinte CO₂ train vs voiture (ADEME 2024)
- Lieux touristiques de la commune d'arrivée (Basilic)
- Carte Leaflet interactive avec marqueurs

---

## Données

### Gares (`src/data/gares_paca.js`)
- **7 gares de départ** (5 grandes villes) : Marseille, Aix-en-Provence, Nice, Toulon, Avignon
- **96 gares d'arrivée** (88 villes) organisées par département PACA

### Lieux touristiques (`src/data/monuments_paca.js`)
- **3 255 lieux** issus de Basilic (Base des Lieux et Équipements Culturels)
- Source : data.gouv.fr
- Filtrage : types touristiques uniquement (monuments, musées, parcs, théâtres, cinémas)
- Exclus : bibliothèques, librairies, archives, établissements d'enseignement
- Champ `commune_lower` pour filtre par commune exacte de la gare d'arrivée

### Cartes Folium (`public/cartes/`)
- `paca_lieux_culturels_avec_gares.html` — 935 lieux Basilic + 135 gares
- `carte_gares_lignes_couleurs_foncees.html` — réseau ferroviaire PACA

---

## Logique API SNCF

```
Endpoint : api.sncf.com/v1/coverage/sncf/journeys
Auth     : Basic (clé API SNCF Open Data)

Paramètres :
  from     = stop_area:SNCF:{UIC_depart}
  to       = stop_area:SNCF:{UIC_arrivee}
  datetime = {date}T000000
  count    = 15

Boucle multi-appels (00h00 → 23h59, max 12 appels) :
  → Filtre dep.startsWith(dateBase) : date exacte uniquement
  → Déduplication via Set() sur heure de départ
  → Avance : dernier départ + 1 minute

Résultat : tous les trains de la journée
  → Premier départ · Dernier départ · Nombre exact · Distance réelle
```

---

## Calcul CO₂ (ADEME 2024)

```
Distance = depuis l'API SNCF (réelle) ou haversine (fallback GPS)

CO₂ train   = distance × 1.73 g/km
CO₂ voiture = distance × 218 g/km
Ratio       = 126× moins en train
```

---

## Pipeline Basilic

```
data.gouv.fr — Basilic brut (86 366 lignes France)
    ↓ Notebook Python
culture.csv — 5 226 lignes PACA filtrées
    ↓ Script filtrage touristique
monuments_paca.js — 3 255 lieux
    ↓ Page 3 Trajets
Filtre commune exacte → lieux de la ville d'arrivée
```
