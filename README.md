# Event Management System

A React app for exploring events, viewing event details and registering for events. Built with React, Redux Toolkit, React Router and the Ticketmaster Discovery API.

## Features

- User registration, login and logout (frontend simulation with localStorage)
- Browse upcoming events from the Ticketmaster Discovery API
- Search events by keyword and filter by category
- Event details page with venue, location, dates and prices
- Register for events and cancel registrations
- My Events page split into upcoming and completed events

## Setup

1. Clone the repository
2. Install dependencies

```
npm install
```

3. Get an API key from https://developer.ticketmaster.com/

4. Create a `.env` file in the project root (same format as `.env.example`) and add your key

```
VITE_TICKETMASTER_KEY=your_api_key
```

5. Start the development server

```
npm run dev
```

## Notes

- The `.env` file is git ignored so the API key is not committed
- Authentication is simulated on the frontend, there is no backend
