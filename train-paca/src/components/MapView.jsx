import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function createMonumentIcon(highlight = false) {
  const size = highlight ? 40 : 32;
  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      background:#6f42c1;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      border:${highlight ? '3px' : '2px'} solid white;
    "><span style="transform:rotate(45deg);font-size:${highlight ? '1.1' : '0.9'}rem">🏛️</span></div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -(size + 4)],
  });
}

function createStationIcon(isDepart) {
  const color = isDepart ? "#1a3a1a" : "#c0392b";
  return L.divIcon({
    html: `<div style="
      width:46px;height:46px;
      background:${color};
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:1.4rem;
      box-shadow:0 3px 12px rgba(0,0,0,0.4);
      border:3px solid white;
    ">🚉</div>`,
    className: "",
    iconSize: [46, 46],
    iconAnchor: [23, 46],
    popupAnchor: [0, -50],
  });
}

export default function MapView({ gareDepart, gareArrivee, monuments = [], highlightMon }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    if (mapInstanceRef.current) return;
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [43.8, 6.0],
      zoom: 7,
      zoomControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(mapInstanceRef.current);
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    layersRef.current.forEach((l) => map.removeLayer(l));
    layersRef.current = [];

    if (!gareDepart && !gareArrivee) {
      map.setView([43.8, 6.0], 7);
      return;
    }

    const bounds = L.latLngBounds();

    if (gareDepart) {
      const m = L.marker([gareDepart.lat, gareDepart.lng], { icon: createStationIcon(true) })
        .addTo(map)
        .bindPopup(`<div style="min-width:160px">
          <b style="color:#1a3a1a">🚉 Départ</b><br>
          <span style="font-size:1rem;font-weight:700">${gareDepart.nom}</span>
        </div>`);
      layersRef.current.push(m);
      bounds.extend([gareDepart.lat, gareDepart.lng]);
    }

    if (gareArrivee) {
      const m = L.marker([gareArrivee.lat, gareArrivee.lng], { icon: createStationIcon(false) })
        .addTo(map)
        .bindPopup(`<div style="min-width:160px">
          <b style="color:#c0392b">🚉 Arrivée</b><br>
          <span style="font-size:1rem;font-weight:700">${gareArrivee.nom}</span>
        </div>`);
      layersRef.current.push(m);
      bounds.extend([gareArrivee.lat, gareArrivee.lng]);
    }

    if (gareDepart && gareArrivee) {
      const ligne = L.polyline(
        [[gareDepart.lat, gareDepart.lng], [gareArrivee.lat, gareArrivee.lng]],
        { color: "#1a3a1a", weight: 3, opacity: 0.8, dashArray: "8 6" }
      ).addTo(map);
      layersRef.current.push(ligne);
    }

    // Monuments sur la carte
    monuments.forEach((mon) => {
      const isHL = highlightMon && mon.nom === highlightMon.nom;
      const marker = L.marker([mon.lat, mon.lng], {
        icon: createMonumentIcon(isHL),
        zIndexOffset: isHL ? 1000 : 0,
      })
        .addTo(map)
        .bindPopup(`<div style="min-width:190px;max-width:250px">
          <div style="font-weight:700;color:#4a2d8a;font-size:0.95rem;margin-bottom:5px">
            🏛️ ${mon.nom}
          </div>
          <div style="font-size:0.78rem;color:#888;margin-bottom:6px">
            📍 ${mon.distance.toFixed(1)} km de la gare${mon.commune ? ' · ' + mon.commune : ''}
          </div>
          ${mon.description
            ? `<p style="font-size:0.8rem;color:#555;margin:0;line-height:1.4">${mon.description.slice(0, 130)}…</p>`
            : ""}
        </div>`);
      layersRef.current.push(marker);
      if (isHL) setTimeout(() => marker.openPopup(), 150);
    });

    if (bounds.isValid()) {
      const allPts = monuments.slice(0, 15);
      allPts.forEach(p => bounds.extend([p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [55, 55], maxZoom: 13 });
    }
  }, [gareDepart, gareArrivee, monuments]);

  // Zoom sur monument sélectionné
  useEffect(() => {
    if (!highlightMon || !mapInstanceRef.current) return;
    mapInstanceRef.current.setView([highlightMon.lat, highlightMon.lng], 14, { animate: true });
  }, [highlightMon]);

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-leaflet" />
      <div className="map-legend">
        <span>🚉 Gare départ</span>
        <span>🚉 Gare arrivée</span>
        <span style={{ color: "#6f42c1" }}>🏛️ Monument culturel</span>
      </div>
    </div>
  );
}
