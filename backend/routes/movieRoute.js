import express from "express";

import {
    searchMovies,
    movieDetails,
    trendingMovies,
    popularMovies
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/popular", popularMovies);
router.get("/trending", trendingMovies);
router.get("/search", searchMovies);
router.get("/:id", movieDetails);

export default router;