import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeRegistration } from "../features/registrations/registrationsSlice";

function MyEvents() {
  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.registrations.items);
  const dispatch = useDispatch();

  const myEvents = items.filter((item) => item.userEmail === user.email);
  const today = new Date();
  const upcoming = myEvents.filter((item) => new Date(item.date) >= today);
  const completed = myEvents.filter((item) => new Date(item.date) < today);

  const handleCancel = (id) => {
    dispatch(removeRegistration(id));
  };

  return (
    <div className="container">
      <h1>My Events</h1>

      {myEvents.length === 0 && (
        <p>
          You have not registered for any events yet.{" "}
          <Link to="/events">Browse events</Link>
        </p>
      )}

      <h2>Upcoming</h2>
      {upcoming.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <div className="events-grid">
          {upcoming.map((item) => (
            <div className="event-card" key={item.id}>
              {item.image && <img src={item.image} alt={item.name} />}
              <div className="event-card-body">
                <h3>{item.name}</h3>
                <p>{new Date(item.date).toDateString()}</p>
                <p>{item.venue}</p>
                <p>{item.city}</p>
                <button className="danger" onClick={() => handleCancel(item.id)}>
                  Cancel Registration
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>Completed</h2>
      {completed.length === 0 ? (
        <p>No completed events.</p>
      ) : (
        <div className="events-grid">
          {completed.map((item) => (
            <div className="event-card" key={item.id}>
              {item.image && <img src={item.image} alt={item.name} />}
              <div className="event-card-body">
                <h3>{item.name}</h3>
                <p>{new Date(item.date).toDateString()}</p>
                <p>{item.venue}</p>
                <p>{item.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;
