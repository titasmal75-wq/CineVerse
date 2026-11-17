import "./Profile.css";

const genres = ["Drama", "Sci-fi", "Comedy", "Thriller", "Animation"];

function Profile() {
  return (
    <main className="profile-page">
      <div className="profile-content">
        <header className="profile-heading">
          <p className="profile-eyebrow">YOUR SPACE</p>
          <h1>Your profile</h1>
          <p>Keep track of your movie journey and shape recommendations around you.</p>
        </header>

        <section className="profile-overview" aria-labelledby="profile-name">
          <div className="profile-avatar" aria-hidden="true">M</div>
          <div className="profile-identity">
            <p className="profile-eyebrow">MOVIE ENTHUSIAST</p>
            <h2 id="profile-name">Welcome to Prism</h2>
            <p>Your personal home for discovering what to watch next.</p>
          </div>
          <div className="profile-member">
            <span className="profile-status-dot" />
            Profile active
          </div>
        </section>

        <div className="profile-grid">
          <section className="profile-card profile-card--wide" aria-labelledby="taste-title">
            <div className="profile-card-heading">
              <div>
                <p className="profile-eyebrow">PERSONALIZE YOUR PICKS</p>
                <h2 id="taste-title">Your movie taste</h2>
              </div>
              <span className="profile-card-icon" aria-hidden="true">✦</span>
            </div>
            <p className="profile-card-copy">
              Choose the genres you enjoy to help make future recommendations feel more you.
            </p>
            <div className="profile-genres" aria-label="Popular movie genres">
              {genres.map((genre) => (
                <span className="profile-genre" key={genre}>{genre}</span>
              ))}
            </div>
            <p className="profile-note">Genre preferences are ready to customize as you explore.</p>
          </section>

          <section className="profile-card" aria-labelledby="activity-title">
            <p className="profile-eyebrow">YOUR ACTIVITY</p>
            <h2 id="activity-title">Your movie journey</h2>
            <div className="profile-stats">
              <div className="profile-stat">
                <strong>0</strong>
                <span>Favorites</span>
              </div>
              <div className="profile-stat">
                <strong>0</strong>
                <span>On your watch list</span>
              </div>
            </div>
            <p className="profile-note">Your saved movies will show up here.</p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;
