
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getPosterUrl = (posterPath, size = "w500") => {
  if (!posterPath) return "https://via.placeholder.com/500x750?text=No+Poster";
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
};

export const getBackdropUrl = (backdropPath, size = "original") => {
  if (!backdropPath) return "";
  return `${TMDB_IMAGE_BASE_URL}/${size}${backdropPath}`;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/movies";

async function request(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `API request failed with status ${response.status}`);
  }

  return response.json();
}

export const movieApi = {

  getPopular: (page = 1) => request("/popular", { page }),


  getTrending: () => request("/trending"),

  search: (query, page = 1) => request("/search", { query, page }),

  getDetails: (id) => request(`/${id}`)
};

export default movieApi;
