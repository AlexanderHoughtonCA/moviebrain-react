# MovieBrain (Frontend)

MovieBrain is a React-based website for browsing and discovering movies. 
It is designed to work with the microservices backend here:  
[MovieBrain Backend](https://github.com/AlexanderHoughtonCA/moviebrain/tree/main)

It provides a responsive interface for searching, viewing details, and exploring cast and crew information, all powered by movie data services connected through the API gateway.

## Demo
[Movie Brain Live DEMO](https://movie-brain.com/)

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

## Known Issues
- Page loads are typically under a second, but I'd like to improve that. API and image caching should help once they're implemented
- Largest Contentful Paint can sometimes be up to 0.68 seconds or more, room for improvement there
- Cumulative Layout Shift varies from 0.05 to 0.12 or so, needs fixing ASAP as it's annoying me now
- I'm not terribly happy with the overall look of the site, will improve ASAP
- There are still responsive/layout problems to fix on mobile and tablet.

## Roadmap

- Improve mobile responsiveness
- Add filtering/sorting in search results
- Expand profile features
- Integrate ratings display
- Ratings
- Reviews
- AI-powered recommendations

## License

This project is licensed under the MIT License.
