const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export async function fetchEvents(filters = {}) {
  const params = new URLSearchParams({
    apikey: import.meta.env.VITE_TICKETMASTER_KEY,
    size: 20,
  });

  if (filters.keyword) {
    params.set("keyword", filters.keyword);
  }

  if (filters.category) {
    params.set("classificationName", filters.category);
  }

  const response = await fetch(`${BASE_URL}/events.json?${params}`);

  if (!response.ok) {
    throw new Error("Could not load events");
  }

  const data = await response.json();

  if (data._embedded) {
    return data._embedded.events;
  }

  return [];
}

export async function fetchEventById(id) {
  const params = new URLSearchParams({
    apikey: import.meta.env.VITE_TICKETMASTER_KEY,
  });

  const response = await fetch(`${BASE_URL}/events/${id}.json?${params}`);

  if (!response.ok) {
    throw new Error("Could not load event");
  }

  return response.json();
}
