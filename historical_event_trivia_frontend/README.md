# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

Environment
- Copy .env.example to .env
- Set REACT_APP_API_BASE to your backend API base (default: http://localhost:3001)
- The frontend uses credentials: 'include' in fetch to allow backend HttpOnly cookies for session.

Local Development
- npm install
- npm start
- Open http://localhost:3000

Backend/CORS Note
- Ensure backend CORS allows http://localhost:3000 and supports credentials.
- For local development, backend cookie settings should be SameSite=Lax and Secure=false.
- See backend/INTEGRATION.md for details.

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors
The main brand colors are defined as CSS variables in `src/App.css`.

### Components
This template uses pure HTML/CSS components instead of a UI framework.

## Learn More
To learn React, check out the [React documentation](https://reactjs.org/).
