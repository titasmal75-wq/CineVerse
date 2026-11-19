import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiStar, FiArrowLeft, FiClock, FiCalendar, FiPlay, FiFilm } from "react-icons/fi";
import movieApi, { getBackdropUrl, getPosterUrl } from "../rest api layer/movieApi";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    async function fetchMovie() {
      try {
        setLoading(true);
        setError(null);
        const data = await movieApi.getDetails(id);
        if (alive) {
          setMovie(data);
        }
      } catch (err) {
        if (alive) {
          setError(err.message || "Failed to load movie details");
        }
      } finally {
        if (alive) setLoading(false);
      }
    }

    if (id) {
      fetchMovie();
    }

    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="md-loading-container">
        <div className="md-spinner" />
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="md-error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error || "Movie not found"}</p>
        <Link to="/" className="md-back-btn">
          <FiArrowLeft /> Back to Movies
        </Link>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
  const posterUrl = getPosterUrl(movie.poster_path);
  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";
  const cast =
    movie.credits?.cast?.length > 0
      ? movie.credits.cast.slice(0, 15)
      : movie.cast?.length > 0
      ? movie.cast.slice(0, 15)
      : [];
  const trailer = movie.videos?.results?.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  return (
    <div className="md-page">
      
      {backdropUrl && (
        <div
          className="md-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}
      <div className="md-backdrop-overlay" />

      <div className="md-content">

        
        <Link to="/" className="md-back-link">
          <FiArrowLeft /> Back
        </Link>

       
        <div className="md-card">
          
          <div className="md-poster-section">
            <img
              src={posterUrl}
              alt={movie.title}
              className="md-poster-img"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/500x750/141028/ffffff?text=No+Poster";
              }}
            />
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="md-trailer-btn"
              >
                <FiPlay /> Watch Trailer
              </a>
            )}
          </div>

          
          <div className="md-info-section">
            <h1 className="md-title">
              {movie.title}{" "}
              {movie.release_date && (
                <span className="md-year">({releaseYear})</span>
              )}
            </h1>

            {movie.tagline && (
              <p className="md-tagline">"{movie.tagline}"</p>
            )}

            {/* Badges / Meta row */}
            <div className="md-meta-row">
              <span className="md-rating-badge">
                <FiStar /> {rating} / 10
              </span>
              {movie.vote_count > 0 && (
                <span className="md-vote-count">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              )}
              {runtime && (
                <span className="md-meta-item">
                  <FiClock /> {runtime}
                </span>
              )}
              {movie.release_date && (
                <span className="md-meta-item">
                  <FiCalendar /> {movie.release_date}
                </span>
              )}
              {movie.status && (
                <span className="md-status-pill">{movie.status}</span>
              )}
            </div>

            {movie.genres?.length > 0 && (
              <div className="md-genres">
                {movie.genres.map((g) => (
                  <span key={g.id} className="md-genre-tag">
                    {g.name}
                  </span>
                ))}
              </div>
            )}


            <div className="md-overview-block">
              <h3>Overview</h3>
              <p>{movie.overview || "No overview provided for this movie."}</p>
            </div>

            {cast.length > 0 && (
              <div className="md-cast-block">
                <h3>Top Cast</h3>
                <div className="md-cast-list">
                  {cast.map((actor) => (
                    <div key={actor.id} className="md-cast-card">
                      <img
                        src={
                          actor.profile_path
                            ? getPosterUrl(actor.profile_path, "w185")
                            : "https://via.placeholder.com/185x278/141028/ffffff?text=Actor"
                        }
                        alt={actor.name}
                        className="md-cast-avatar"
                      />
                      <span className="md-cast-name">{actor.name}</span>
                      <span className="md-cast-character">
                        {actor.character}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="md-genres">
                {movie.genres.map((g) => (
                  <span key={g.id} className="md-genre-tag">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

          
           
                     
          
          </div>
        </div>
      </div>
    </div>
  );
}
