import { Link } from "react-router-dom";

function EventCard({ event }) {
  const venue =
    event._embedded && event._embedded.venues
      ? event._embedded.venues[0]
      : null;
  const image = event.images && event.images.length > 0 ? event.images[0] : null;

  return (
    <Link to={`/events/${event.id}`} className="event-card">
      {image && <img src={image.url} alt={event.name} />}
      <div className="event-card-body">
        <h3>{event.name}</h3>
        <p>{event.dates.start.localDate}</p>
        {venue && (
          <p>
            {venue.city.name}, {venue.country.countryCode}
          </p>
        )}
      </div>
    </Link>
  );
}

export default EventCard;
