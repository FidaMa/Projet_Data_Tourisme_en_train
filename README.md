# 🚂 Projet_Data_Tourisme_en_train

> Projet réalisé dans le cadre de l'**Open Data University Saison 4** — Fondation SNCF  
> Thématique : *"Comment faciliter et encourager le tourisme en train en France ?"*  
> Région ciblée : **Provence-Alpes-Côte d'Azur (PACA)**

---

## 👥 Équipe

Projet réalisé par **Fida Mars**, **Andrea Grasso**, **Asia Redaelli** et **Leila El Mabrouk**  
Filières métier : **Analyse des Données et Aide à la Décision (ADAD)**  
Année universitaire : **2025–2026** — Centrale Méditerranée

---

## 🗂️ Structure du projet (Version Finale)

```
Projet_Data_Tourisme_en_train/
│
├── 📓 NOTEBOOKS (Version Finale)
│   ├── NOTEBOOK_PROJET_FINAL_.ipynb      ← Notebook principal (Basilic + cartes)
│   ├── gares_with_lines_vf.ipynb        ← Carte réseau ferroviaire PACA
│   └── 5k_monuments_analysis.ipynb       # Analyse exploratoire monuments
│
├── 🗺️ CARTES HTML INTERACTIVES (Version Finale)
│   ├── paca_lieux_culturels_avec_gares_vf.html  ← Carte finale : 935 lieux Basilic + gares
│   ├── paca_monuments_vf.html                   ← Carte finale : monuments PACA (Basilic)
│   ├── carte_gares_lignes_couleurs_foncees_vf.html ← Carte réseau ferroviaire PACA
│
├── 📁 DATASETS
│   ├── gares-de-voyageurs (1).csv        # 2 782 gares voyageurs France (SNCF)
│   ├── gares_PACA_avec_coordonnees (1).csv # Gares PACA avec coordonnées GPS
│   ├── horaires-des-gares1 (1).csv       # Horaires d'ouverture des guichets
│   └── lignes-par-region-administrative (1).csv  # Lignes ferroviaires par région
│
├── 📊 AUTRES
│   └── proj_adad.xlsx                    # Fichier Excel analyse complémentaire
│
└── 🌐 SITE WEB
    └── train-paca/                       # Application React TrainPACA (voir README dédié)
```

---

## 📓 Partie 1 — Notebooks (Version Finale)

### Notebook principal
| Fichier | Description |
|---------|-------------|
| `NOTEBOOK_PROJET_FINAL_.ipynb` | **Notebook principal version finale** — Chargement et filtrage de la base Basilic (data.gouv.fr), génération des cartes Folium interactives (lieux culturels + gares PACA), analyse par commune et département |
| `gares_with_lines_vf.ipynb` | **Carte réseau ferroviaire version finale** — Visualisation des gares et lignes SNCF PACA avec couleurs par ligne |
| `5k_monuments_analysis.ipynb` | Analyse exploratoire des monuments DATAtourisme PACA (version précédente) |

### Pipeline de données Basilic
```
data.gouv.fr — Base Basilic brute (86 366 lignes France)
    ↓ NOTEBOOK_PROJET_FINAL_.ipynb
culture.csv — 5 226 lignes PACA filtrées
    ↓ Filtrage : suppression non-touristiques
3 255 lieux touristiques PACA
    ↓ JOIN communes avec gares
935 lieux dans communes desservies par le réseau SNCF
    ↓ Folium
paca_lieux_culturels_avec_gares_vf.html
```

---

## 🗺️ Partie 2 — Cartes HTML interactives (Version Finale)

| Fichier | Description | Données |
|---------|-------------|---------|
| `paca_lieux_culturels_avec_gares_vf.html` | **Carte finale combinée** — 935 lieux culturels Basilic + 135 gares PACA | Basilic · SNCF |
| `paca_monuments_vf.html` | **Carte finale monuments** — tous les lieux culturels Basilic PACA filtrés | Basilic · data.gouv.fr |
| `carte_gares_lignes_couleurs_foncees_vf.html` | **Carte réseau ferroviaire** — gares et lignes SNCF PACA avec couleurs | SNCF Open Data |

---

## 📁 Partie 3 — Datasets

| Dataset | Source | Description |
|---------|--------|-------------|
| `gares-de-voyageurs (1).csv` | SNCF Open Data | 2 782 gares voyageurs France avec segments DRG et coordonnées |
| `gares_PACA_avec_coordonnees (1).csv` | SNCF Open Data | Gares PACA filtrées avec coordonnées GPS |
| `horaires-des-gares1 (1).csv` | SNCF Open Data | Horaires d'ouverture des guichets par jour |
| `lignes-par-region-administrative (1).csv` | data.gouv.fr | Lignes ferroviaires par région administrative |

---

## 🌐 Partie 4 — Site Web React (TrainPACA)

Le site web **TrainPACA** est dans le dossier `train-paca/`.

### Lancement rapide
```bash
cd train-paca
npm install
npm run dev
# → http://localhost:5173/
```

### Pages du site
| Page | URL | Description |
|------|-----|-------------|
| Accueil | `/` | Présentation du projet, stats clés, impact CO₂ |
| Cartes PACA | `/carte` | 2 cartes Folium intégrées (lieux culturels + réseau ferroviaire) |
| Trajets | `/trajets` | Recherche trajets — horaires SNCF temps réel, CO₂, monuments Basilic |

### Données du site
| Fichier | Contenu |
|---------|---------|
| `src/data/gares_paca.js` | 103 gares PACA — 7 départs (5 grandes villes) + 96 arrivées (88 villes) |
| `src/data/monuments_paca.js` | 3 255 lieux touristiques Basilic (monuments, musées, parcs, théâtres, cinémas) |

👉 Voir le [README complet du site](./train-paca/README.md)

---

## 🔗 Sources de données

| Source | Usage | Lien |
|--------|-------|------|
| SNCF Open Data / Navitia | Horaires trains temps réel | https://data.sncf.com |
| Basilic — data.gouv.fr | 3 255 lieux culturels touristiques PACA | https://data.gouv.fr |
| ADEME Base Carbone 2024 | Facteurs CO₂ train/voiture | https://base-empreinte.ademe.fr |
| OpenStreetMap / Leaflet | Fond de carte interactif | https://leafletjs.com |
| API Navitia | Calcul itinéraires ferroviaires | https://navitia.io |

---

## 🌿 Impact environnemental

Le train émet **126× moins de CO₂** que la voiture — basé sur les facteurs ADEME 2024 :

| Transport | Facteur CO₂ (par km/passager) |
|-----------|-------------------------------|
| 🚆 Train | 1,73 g/km |
| 🚗 Voiture | 218 g/km |

> Le site calcule dynamiquement le CO₂ économisé pour chaque trajet selon sa distance réelle fournie par l'API SNCF.

*Source : Base Carbone ADEME 2024*