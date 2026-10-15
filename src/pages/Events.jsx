import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../features/events/eventsSlice";
import EventCard from "../components/EventCard";

function Events() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.events.list);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Events</h1>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      <div className="events-grid">
        {list.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;
