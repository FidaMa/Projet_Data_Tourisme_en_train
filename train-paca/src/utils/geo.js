export function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Facteurs ADEME 2024 (g CO2eq / km / passager)
export const FACTEURS_ADEME = {
  train: 1.73,      // TER/TGV moyenne nationale ADEME 2024
  voiture: 218,     // Voiture thermique moyenne ADEME 2024
  covoiturage: 73,  // Covoiturage 2 personnes ADEME 2024
};

export function co2Comparaison(distanceKm) {
  return {
    train: Math.round(distanceKm * FACTEURS_ADEME.train),
    voiture: Math.round(distanceKm * FACTEURS_ADEME.voiture),
    covoiturage: Math.round(distanceKm * FACTEURS_ADEME.covoiturage),
  };
}

export function getPOIProches(poiList, lat, lng, rayonKm = 10) {
  return poiList
    .map((poi) => ({
      ...poi,
      distance: haversine(lat, lng, poi.lat, poi.lng),
    }))
    .filter((poi) => poi.distance <= rayonKm)
    .sort((a, b) => a.distance - b.distance);
}

export function getHorairesGare(gare, date) {
  if (!gare || !gare.horaires) return null;
  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const d = new Date(date);
  const jourNom = jours[d.getDay()];
  return gare.horaires[jourNom] || null;
}
