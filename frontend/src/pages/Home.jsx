import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrendingUp, FiStar, FiPlay, FiChevronRight } from "react-icons/fi";
import movieApi, { getBackdropUrl } from "../rest api layer/movieApi";
import MovieCard from "../components/MovieCard";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [heroIdx, setHeroIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [trendRes, popRes] = await Promise.all([
          movieApi.getTrending().catch(() => ({ results: [] })),
          movieApi.getPopular(1).catch(() => ({ results: [] })),
        ]);

        if (!alive) return;

        setTrending(trendRes.results || []);
        setPopular(popRes.results || []);

        if (!trendRes.results?.length && !popRes.results?.length) {
          setError("Could not load movies. Make sure your backend is running.");
        }
      } catch (err) {
        if (alive) setError(err.message);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, []);

  
  const heroList = trending.length > 0 ? trending.slice(0, 6) : popular.slice(0, 6);

  useEffect(() => {
    if (heroList.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroList.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroList.length]);

  const hero = heroList[heroIdx];

  return (
    <div className="home-page">

      
      {error && (
        <div className="error-banner">
          <span>⚠</span>
          <p>{error}</p>
        </div>
      )}

      {hero && (
        <section className="hero">
          <div
            className="hero__backdrop"
            style={{ backgroundImage: `url(${getBackdropUrl(hero.backdrop_path)})` }}
          />
          <div className="hero__fade" />

          <div className="hero__body">
            <span className="hero__badge">
              <FiTrendingUp /> Trending #{heroIdx + 1}
            </span>

            <h1 className="hero__title">{hero.title}</h1>

            <div className="hero__meta">
              <span className="hero__rating"><FiStar /> {hero.vote_average?.toFixed(1)}</span>
              <span>{hero.release_date?.slice(0, 4)}</span>
              {hero.vote_count > 0 && <span>{hero.vote_count.toLocaleString()} votes</span>}
            </div>

            <p className="hero__overview">{hero.overview}</p>

            <div className="hero__actions">
              <button className="btn-accent" onClick={() => navigate(`/movie/${hero.id}`)}>
                <FiPlay /> More Info
              </button>
              <button
                className="btn-glass"
                onClick={() => setHeroIdx((heroIdx + 1) % heroList.length)}
                disabled={heroList.length <= 1}
              >
                Next <FiChevronRight />
              </button>
            </div>

            <div className="hero__dots">
              {heroList.map((_, i) => (
                <button
                  key={i}
                  className={`hero__dot ${i === heroIdx ? "active" : ""}`}
                  onClick={() => setHeroIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="movies-section">
        <div className="section-header">
          <h2>Popular Movies</h2>
          <span className="section-tag">Trending on TMDB</span>
        </div>

        {loading ? (
          <div className="card-grid">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="card-skeleton" />
            ))}
          </div>
        ) : popular.length > 0 ? (
          <div className="card-grid">
            {popular.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : null}
      </section>

      {trending.length > 0 && (
        <section className="movies-section">
          <div className="section-header">
            <h2>Trending This Week</h2>
          </div>
          <div className="card-grid">
            {trending.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
