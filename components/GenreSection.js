'use client';
import './GenreSection.css';

export function GenreCards({ genres, songCounts, activeGenre, onSelectGenre }) {
  const nonAllGenres = genres.filter((g) => g.id !== 'all');

  return (
    <section className="genre-section" id="genre-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <i className="fa-solid fa-layer-group" style={{ color: 'var(--accent-primary)' }} />{' '}
            Curated Genre Hubs
          </h2>
          <p>Select your favorite mood or festive genre to explore blockbuster hits</p>
        </div>
      </div>

      <div className="genre-grid" id="genre-cards-grid">
        {nonAllGenres.map((genre) => {
          const count = songCounts[genre.id] || 0;
          const isActive = activeGenre === genre.id;

          return (
            <div
              key={genre.id}
              className={`genre-card${isActive ? ' active' : ''}`}
              style={{
                '--genre-grad': genre.gradient,
                '--genre-accent': genre.accent,
              }}
              data-genre-id={genre.id}
              onClick={() => onSelectGenre(genre.id)}
              role="button"
              tabIndex={0}
            >
              <div className="genre-card-bg-glow" />
              <div className="genre-card-content">
                <div className="genre-card-top">
                  <span className="genre-card-icon">{genre.icon}</span>
                  <span className="genre-card-badge">{count} Tracks</span>
                </div>
                <div className="genre-card-bottom">
                  <h3>{genre.name}</h3>
                  <p>{genre.tagline}</p>
                </div>
              </div>
              <div className="genre-play-overlay" title={`Explore ${genre.name}`}>
                <i className="fa-solid fa-arrow-right" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function GenrePills({ genres, activeGenre, onSelectGenre }) {
  return (
    <div className="genre-pills-container" id="genre-pills-container">
      <div className="genre-pills-scroll" id="genre-pills-scroll">
        {genres.map((g) => (
          <button
            key={g.id}
            className={`genre-pill${activeGenre === g.id ? ' active' : ''}`}
            data-genre-id={g.id}
            onClick={() => onSelectGenre(g.id)}
          >
            <span className="pill-icon">{g.icon}</span>
            <span className="pill-label">{g.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
