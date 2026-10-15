import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../features/events/eventsSlice";
import EventCard from "../components/EventCard";

const categories = [
  "Music",
  "Sports",
  "Arts & Theatre",
  "Film",
  "Miscellaneous",
];

function Events() {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.events.list);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getEvents({ keyword, category }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    dispatch(getEvents({ keyword, category: e.target.value }));
  };

  return (
    <div className="container">
      <h1>Events</h1>
      <form className="filters" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search events"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && list.length === 0 && <p>No events found.</p>}
      <div className="events-grid">
        {list.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;
