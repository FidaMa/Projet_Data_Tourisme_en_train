const API_KEY = "4cf5f095-08ec-45c0-9b18-914b10bd8269";
const BASE = "https://api.sncf.com/v1/coverage/sncf";

async function apiFetch(endpoint) {
  const credentials = btoa(`${API_KEY}:`);
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  if (!res.ok) throw new Error(`API SNCF erreur: ${res.status}`);
  return res.json();
}

export async function getDepartures(stopAreaId, dateISO) {
  const dt = dateISO.replace(/-/g, "") + "T060000";
  const data = await apiFetch(
    `/stop_areas/${stopAreaId}/departures?datetime=${dt}&duration=86400&count=100`
  );
  return data.departures || [];
}

export async function getJourneys(fromId, toId, dateISO) {
  const dt = dateISO.replace(/-/g, "") + "T060000";
  const data = await apiFetch(
    `/journeys?from=${fromId}&to=${toId}&datetime=${dt}&count=10`
  );
  return data.journeys || [];
}

export function parseJourneys(journeys) {
  if (!journeys.length) return null;
  const durations = journeys.map((j) => j.durations?.total || 0).filter(Boolean);
  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);

  const departures = journeys
    .map((j) => {
      const section = j.sections?.find((s) => s.type === "public_transport");
      return section?.departure_date_time;
    })
    .filter(Boolean)
    .sort();

  const formatTime = (dt) =>
    dt ? `${dt.slice(9, 11)}h${dt.slice(11, 13)}` : "";

  return {
    nb: journeys.length,
    dureeMin: Math.round(minDuration / 60),
    dureeMax: Math.round(maxDuration / 60),
    premier: formatTime(departures[0]),
    dernier: formatTime(departures[departures.length - 1]),
  };
}
