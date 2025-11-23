const API_KEY = "76452f";
const BASE_URL = "https://www.omdbapi.com/";

export const getPopularMovies = async () => {
  // OMDB does NOT have "popular", so we fake it using a common default search
  const response = await fetch(`${BASE_URL}?s=marvel&apikey=${API_KEY}`);
  const data = await response.json();
  return data.Search || [];
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`);
  const data = await response.json();
  return data;
};
