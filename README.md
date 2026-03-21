# 🚂 Projet_Data_Tourisme_en_train

> Projet réalisé dans le cadre de l'**Open Data University Saison 4** — Fondation SNCF  
> Thématique : *"Comment faciliter et encourager le tourisme en train en France ?"*  
> Région ciblée : **Provence-Alpes-Côte d'Azur (PACA)**

---

## 👥 Équipe

Projet réalisé par **Fida Mars**, **Andrea Grasso**, **Asia Redaelli** et **Leila El Mabrouk**

---

## 🗂️ Structure du projet

```
Projet_Data_Tourisme_en_train/
│
├── 📊 ANALYSE & CARTOGRAPHIE
│   ├── 5k_monuments_analysis.ipynb       # Analyse des monuments DATAtourisme PACA
│   ├── gares_with_lines.ipynb            # Carte réseau ferroviaire PACA
│   ├── paca_monuments.html               # Carte interactive monuments PACA
│   ├── paca_monuments_avec_gares.html    # Carte monuments + gares PACA
│   └── proj_adad.xlsx                    # Fichier Excel analyse complémentaire
│
├── 📁 DATASETS
│   ├── gares-de-voyageurs (1).csv        # 2 782 gares voyageurs France (SNCF)
│   ├── gares_PACA_horaires_geo_clean.csv # Gares PACA avec horaires et coordonnées
│   ├── horaires-des-gares1 (1).csv       # Horaires d'ouverture des guichets
│   └── lignes-par-region-administrative (1).csv  # Lignes ferroviaires par région
│
└── 🌐 SITE WEB
    └── train-paca/                       # Application React (voir README dédié)
```

---

## 📊 Partie 1 — Analyse & Cartographie

### Notebooks Jupyter
| Fichier | Description |
|---------|-------------|
| `5k_monuments_analysis.ipynb` | Analyse et filtrage des 21 347 POI DATAtourisme PACA — monuments, clustering géographique |
| `gares_with_lines.ipynb` | Visualisation du réseau ferroviaire PACA avec les lignes et les gares |

### Cartes HTML interactives
| Fichier | Description |
|---------|-------------|
| `paca_monuments.html` | Carte interactive des monuments culturels PACA (Folium) |
| `paca_monuments_avec_gares.html` | Carte combinée monuments + gares PACA avec plots |

> 🔜 Ces cartes seront intégrées dans la **Page 2 du site web** (Cartes PACA)

---

## 📁 Partie 2 — Datasets

| Dataset | Source | Description |
|---------|--------|-------------|
| `gares-de-voyageurs.csv` | SNCF Open Data | 2 782 gares voyageurs France avec segments DRG et coordonnées |
| `gares_PACA_horaires_geo_clean.csv` | SNCF Open Data | Gares PACA filtrées avec horaires et géolocalisation |
| `horaires-des-gares1.csv` | SNCF Open Data | Horaires d'ouverture des guichets par jour |
| `lignes-par-region-administrative.csv` | data.gouv.fr | Lignes ferroviaires par région administrative |

---

## 🌐 Partie 3 — Site Web React

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
| Accueil | `/` | Présentation du projet et impact CO₂ |
| Cartes PACA | `/carte` | Cartes interactives du réseau et monuments |
| Trajets | `/trajets` | Recherche de trajets avec horaires SNCF temps réel |

👉 Voir le [README complet du site](./train-paca/README.md)

---

## 🔗 Sources de données

| Source | Lien |
|--------|------|
| SNCF Open Data | https://data.sncf.com |
| DATAtourisme | https://datatourisme.fr |
| ADEME Base Carbone 2024 | https://base-empreinte.ademe.fr |
| data.gouv.fr | https://data.gouv.fr |
| API Navitia | https://navitia.io |

---

## 🌿 Impact environnemental

Le train émet **126x moins de CO₂** que la voiture pour un même trajet en PACA.

| Transport | CO₂ / 100 km |
|-----------|-------------|
| 🚆 Train | 173 g |
| 🚗 Voiture | 21 800 g |

*Source : Base Carbone ADEME 2024*
