import tmdb from "../config/tmdb.js";

export const getPopularMovies = async (page = 1) => {
    const response = await tmdb.get("/movie/popular", {
        params: {
            language: "en-US",
            page
        }
    });

    return response.data;
};


export const getTrendingMovies = async () =>{
    const response = await tmdb.get("/trending/movie/week");

    return response.data;
};


export const getSearchMovies = async (query, page = 1) => {
    const response = await tmdb.get("/search/movie", {
        params: {
            query,
            page,
            include_adult: false
        }
    });

    return response.data;
};


export const getMovieDetails = async (movieId) => {
    const response = await tmdb.get(`/movie/${movieId}`, {
        params: {
            append_to_response: "credits,videos,similar,recommendations"
        }
    });

    return response.data;
}