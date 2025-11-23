// src/services/api.js
const API_KEY = "76452f";
const BASE_URL = "https://www.omdbapi.com/";

// Normalize OMDB movie into our app shape
const normalizeMovie = (omdbMovie) => ({
  id: omdbMovie.imdbID,
  title: omdbMovie.Title || "Unknown",
  year: omdbMovie.Year || "Unknown",
  poster:
    omdbMovie.Poster && omdbMovie.Poster !== "N/A"
      ? omdbMovie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image",
});

// Common fetch helper
const fetchMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (data.Response === "False") {
    return {
      movies: [],
      totalResults: 0,
      error: data.Error || "No results found",
    };
  }

  const movies = (data.Search || []).map(normalizeMovie);
  const totalResults = Number(data.totalResults || movies.length || 0);

  return { movies, totalResults, error: null };
};

// “Popular” = fake popular using a fixed keyword (OMDB has no real popular endpoint)
export const getPopularMovies = async (page = 1) => {
  const url = `${BASE_URL}?s=marvel&page=${page}&apikey=${API_KEY}`;
  return fetchMovies(url);
};

// Search movies by query + page
export const searchMovies = async (query, page = 1) => {
  const url = `${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`;
  return fetchMovies(url);
};
