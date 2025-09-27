# MovieBrain (Frontend)

MovieBrain is a React-based website for browsing and discovering movies.  
It provides a responsive interface for searching, viewing details, and exploring cast and crew information, all powered by movie data services connected through the API gateway.

## Features

- **Search Movies** — find movies by title and browse results
- **Movie Pages** — view posters, backdrops, overview, cast, and crew
- **Cast & Crew Sorting** — directing, producing, and writing prioritized in crew listings
- **Showcase / Attract Mode** — engaging display for unregistered visitors
- **User Accounts** — register, login, and logout with JWT-based auth
- **Profile View** — see user information and activity
- **Responsive Design** — optimized for desktop and mobile

## Tech Stack

- **React 18** with functional components and hooks
- **React Router** for navigation
- **React-Bootstrap** for UI components (Navbar, Layout helpers, Forms, Buttons)
- **Custom CSS** for theming
- **JWT Authentication** stored in localStorage

## Getting Started

### Prerequisites
- Node.js 18+

### Local Setup

1. Clone the repo and enter the project directory:
   ```bash
   git clone git@github.com:AlexanderHoughtonCA/MovieBrainReact.git
   cd MovieBrainReact
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:  
   Create a `.env` file with your API gateway URL:
   ```bash
   REACT_APP_API_GATEWAY_URL=http://localhost:4770
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The site will be available at `http://localhost:3000`.

## Roadmap

- Improve mobile responsiveness
- Add filtering/sorting in search results
- Expand profile features
- Integrate ratings display

## License

This project is licensed under the MIT License.
