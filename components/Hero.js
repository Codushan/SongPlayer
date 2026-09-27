'use client';

export default function Hero({ onDj, onChhath, onClassics }) {
  return (
    <section className="hero-banner">
      <div className="hero-bg-shapes"></div>
      <div className="hero-content">
        <div className="hero-tag">
          <i className="fa-solid fa-sparkles"></i> Complete Bhojpuri Music Genre Collection
        </div>
        <h2 className="hero-title">
          Authentic Desi Melodies &amp; <span>Modern Bhojpuri Rhythms</span>
        </h2>
        <p className="hero-subtitle">
          From the first 1962 classic film recording to today&apos;s viral chartbusters — explore DJ Dance, Chhath
          Mahaparv, Devi Bhakti, Holi Fagun, Biraha, and pure Folk songs, streamed as pure audio.
        </p>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number" id="hero-stat-songs">1,534+</span>
            <span className="stat-label">Total Songs</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10</span>
            <span className="stat-label">Music Genres</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">60+</span>
            <span className="stat-label">Years of Heritage</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Legendary Artists</span>
          </div>
        </div>

        <div className="hero-actions">
          <button className="btn-primary" id="hero-btn-dj" onClick={onDj}>
            <i className="fa-solid fa-fire"></i> DJ Party Mix
          </button>
          <button className="btn-secondary" id="hero-btn-chhath" onClick={onChhath}>
            <i className="fa-solid fa-sun"></i> Chhath Special
          </button>
          <button className="btn-secondary" id="hero-btn-classics" onClick={onClassics}>
            <i className="fa-solid fa-compact-disc"></i> 90s Classics
          </button>
        </div>
      </div>
    </section>
  );
}
