import "dotenv/config";
import axios from "axios";

const tokenOrKey = (process.env.TMDB_ACCESS_TOKEN || process.env.TMDB_API_KEY || "").trim();


const isApiKey = tokenOrKey.length <= 32;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    ...(!isApiKey && tokenOrKey ? { Authorization: `Bearer ${tokenOrKey}` } : {})
  },
  params: {
    ...(isApiKey && tokenOrKey ? { api_key: tokenOrKey } : {})
  }
});

export default tmdb;
