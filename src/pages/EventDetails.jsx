import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventDetails } from "../features/events/eventsSlice";
import {
  addRegistration,
  removeRegistration,
} from "../features/registrations/registrationsSlice";

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const event = useSelector((state) => state.events.event);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector((state) => state.registrations.items);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getEventDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  const venue =
    event._embedded && event._embedded.venues
      ? event._embedded.venues[0]
      : null;
  const image = event.images && event.images.length > 0 ? event.images[0] : null;
  const classification =
    event.classifications && event.classifications.length > 0
      ? event.classifications[0]
      : null;
  const price =
    event.priceRanges && event.priceRanges.length > 0
      ? event.priceRanges[0]
      : null;

  const alreadyRegistered =
    user &&
    registrations.some(
      (item) => item.eventId === event.id && item.userEmail === user.email
    );

  const handleRegister = () => {
    if (alreadyRegistered) {
      return;
    }

    dispatch(
      addRegistration({
        id: Date.now(),
        eventId: event.id,
        userEmail: user.email,
        name: event.name,
        image: image ? image.url : "",
        date: event.dates.start.localDate,
        venue: venue ? venue.name : "",
        city: venue ? venue.city.name + ", " + venue.country.name : "",
        category:
          classification && classification.segment
            ? classification.segment.name
            : "Other",
      })
    );
    setMessage("You have successfully registered for this event");
  };

  const handleCancel = () => {
    const registration = registrations.find(
      (item) => item.eventId === event.id && item.userEmail === user.email
    );
    dispatch(removeRegistration(registration.id));
    setMessage("Your registration has been cancelled");
  };

  return (
    <div className="container">
      <div className="details-card">
        {image && <img src={image.url} alt={event.name} />}
        <div className="details-info">
          <h1>{event.name}</h1>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(event.dates.start.localDate).toDateString()}
            {event.dates.start.localTime
              ? ` at ${event.dates.start.localTime}`
              : ""}
          </p>
          <p>
            <strong>Venue:</strong> {venue ? venue.name : "Not available"}
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {venue ? venue.city.name + ", " + venue.country.name : "Not available"}
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {classification && classification.segment
              ? classification.segment.name
              : "Other"}
          </p>
          {price && (
            <p>
              <strong>Price:</strong> {price.min} - {price.max} {price.currency}
            </p>
          )}
          {event.info && (
            <p>
              <strong>Info:</strong> {event.info}
            </p>
          )}
          <a href={event.url} target="_blank" rel="noreferrer">
            View on Ticketmaster
          </a>
          <div className="register-section">
            {user ? (
              alreadyRegistered ? (
                <button className="danger" onClick={handleCancel}>
                  Cancel Registration
                </button>
              ) : (
                <button onClick={handleRegister}>Register for this Event</button>
              )
            ) : (
              <p>
                <Link to="/login">Login</Link> to register for this event
              </p>
            )}
            {message && <p className="success">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
