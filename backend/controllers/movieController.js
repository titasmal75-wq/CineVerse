import {
    getPopularMovies,
    getTrendingMovies,
    getSearchMovies,
    getMovieDetails
} from "../services/tmdbService.js";

export const popularMovies = async (req, res) => {
    try {
        const data = await getPopularMovies(req.query.page || 1);
        res.json(data);
    } catch (error) {
        console.error("Failed to fetch popular movies:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: "Failed to fetch popular movies",
            error: error.response?.data || error.message
        });
    }
};

export const trendingMovies = async (req, res) => {
    try {
        const data = await getTrendingMovies();
        res.json(data);
    } catch (error) {
        console.error("Failed to fetch trending movies:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: "Failed to fetch trending movies",
            error: error.response?.data || error.message
        });
    }
};

export const searchMovies = async (req, res) => {
    const { query, page } = req.query;
    if (!query) {
        return res.status(400).json({
            message: "Search query is required"
        });
    }

    try {
        const data = await getSearchMovies(query, page || 1);
        res.json(data);
    } catch (error) {
        console.error("Failed to search movies:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: "Movie search failed",
            error: error.response?.data || error.message
        });
    }
};

export const movieDetails = async (req, res) => {
    try {
        const data = await getMovieDetails(req.params.id);
        res.json(data);
    } catch (error) {
        console.error("Failed to fetch movie details:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            message: "Failed to fetch movie details",
            error: error.response?.data || error.message
        });
    }
};


