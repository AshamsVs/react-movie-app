LibraryX

A modern, fast movie browsing app built with React and Vite. LibraryX includes live search, a favorites system, and an Apple TV–style scrolling interface.

Features

Live movie search

Add and remove favorites

Horizontal movie browser with smooth scroll

Animated logo and premium UI styling

Persistent favorites using Local Storage

Responsive layout

Tech Stack

React (Hooks + Context API)

Vite

CSS (custom design)

Font Awesome

OMDb API

Installation
git clone https://github.com/YOUR-USERNAME/LibraryX.git
cd LibraryX
npm install
npm run dev

Build
npm run build
npm run preview

Environment Setup

Create .env in the project root:

VITE_OMDB_API_KEY=your_api_key_here


API Key available at: https://www.omdbapi.com/apikey.aspx

Project Structure
src/
 ┣ assets/
 ┃ ┗ logo.svg
 ┣ components/
 ┃ ┣ BrandLogo.jsx
 ┃ ┣ NavBar.jsx
 ┃ ┗ OrbitalGallery.jsx
 ┣ context/
 ┃ ┗ movieContext.jsx
 ┣ pages/
 ┃ ┣ Home.jsx
 ┃ ┗ Favorites.jsx
 ┣ css/
 ┃ ┣ navbar.css
 ┃ ┗ orbital.css
 ┣ App.jsx
 ┗ main.jsx

Future Improvements

Dedicated movie details page

Filtering by genre and rating

TMDB integration

User accounts and syncing

License

MIT License.

Contribution

Pull requests are welcome.