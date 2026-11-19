import { useState } from "react";
import { Link } from "react-router-dom";
import { FiStar, FiHeart } from "react-icons/fi";
import { getPosterUrl } from "../rest api layer/movieApi";
import "./MovieCard.css";

export default function MovieCard({ movie, onToggleFavorite }) {
  const [imgError, setImgError] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!movie) return null;

  const poster = imgError
    ? "https://via.placeholder.com/500x750/141028/fff?text=No+Poster"
    : getPosterUrl(movie.poster_path);

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    onToggleFavorite?.(movie, !liked);
  };

  return (
    <article className="mc">
      <Link to={`/movie/${movie.id}`} className="mc__link">

        {/* Poster */}
        <div className="mc__poster-wrap">
          <img
            className="mc__poster"
            src={poster}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgError(true)}
          />

          {/* Hover overlay with overview */}
          <div className="mc__overlay">
            <p className="mc__overview">
              {movie.overview
                ? movie.overview.length > 110
                  ? movie.overview.slice(0, 110) + "…"
                  : movie.overview
                : "No overview available."}
            </p>
          </div>

          {/* Fav button */}
          <button
            className={`mc__fav ${liked ? "is-liked" : ""}`}
            onClick={toggleFav}
            aria-label="Toggle Favorite"
          >
            <FiHeart />
          </button>

          {/* Rating pill */}
          <div className="mc__rating">
            <FiStar />
            <span>{rating}</span>
          </div>
        </div>

        {/* Info */}
        <div className="mc__info">
          <h3 className="mc__title">{movie.title}</h3>
          <span className="mc__year">{year}</span>
        </div>
      </Link>
    </article>
  );
}
