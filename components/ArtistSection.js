'use client';
import './ArtistSection.css';

// Unique gradient per artist — gives each star their own visual identity
const ARTIST_COLORS = {
  'Pawan Singh': 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
  'Khesari Lal Yadav': 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
  'Sharda Sinha': 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
  'Manoj Tiwari': 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
  'Shilpi Raj': 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
  'Bharat Sharma Vyas': 'linear-gradient(135deg, #059669 0%, #047857 100%)',
  'Dinesh Lal Yadav': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
  'Kalpana Patowary': 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
  'Priyanka Singh': 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)',
  'Ritesh Pandey': 'linear-gradient(135deg, #65a30d 0%, #4d7c0f 100%)',
};

// Shadow color per artist
const ARTIST_SHADOW_COLOR = {
  'Pawan Singh': 'rgba(225, 29, 72, 0.4)',
  'Khesari Lal Yadav': 'rgba(124, 58, 237, 0.4)',
  'Sharda Sinha': 'rgba(217, 119, 6, 0.4)',
  'Manoj Tiwari': 'rgba(2, 132, 199, 0.4)',
  'Shilpi Raj': 'rgba(219, 39, 119, 0.4)',
  'Bharat Sharma Vyas': 'rgba(5, 150, 105, 0.4)',
  'Dinesh Lal Yadav': 'rgba(220, 38, 38, 0.4)',
  'Kalpana Patowary': 'rgba(147, 51, 234, 0.4)',
  'Priyanka Singh': 'rgba(8, 145, 178, 0.4)',
  'Ritesh Pandey': 'rgba(101, 163, 13, 0.4)',
};

export default function ArtistSection({
  artists,
  activeArtist,
  onSelectArtist,
  onClearArtist,
  onPlayArtist,
}) {
  return (
    <section className="artist-section" id="artist-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <i className="fa-solid fa-microphone-lines" style={{ color: 'var(--accent-gold)' }} />{' '}
            Bhojpuri Stars &amp; Singers
          </h2>
        </div>
        <div className="section-actions">
          {activeArtist && (
            <button className="filter-btn active" id="btn-clear-artist" onClick={onClearArtist}>
              <i className="fa-solid fa-xmark" /> Clear Artist Filter
            </button>
          )}
        </div>
      </div>

      <div className="artists-scroll-wrap" id="artists-scroll-wrap">
        {artists.map((artist) => {
          const isActive = activeArtist === artist.name;
          const artistGrad = ARTIST_COLORS[artist.name] || 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
          const shadowCol = ARTIST_SHADOW_COLOR[artist.name] || 'rgba(245, 158, 11, 0.35)';

          return (
            <div
              key={artist.name}
              className={`artist-card${isActive ? ' active' : ''}`}
              data-artist={artist.name}
              style={{
                '--artist-color': artistGrad,
              }}
              onClick={() => onSelectArtist(artist.name)}
              role="button"
              tabIndex={0}
            >
              <div className="artist-avatar-wrap">
                <div
                  className="artist-avatar"
                  style={{
                    background: artistGrad,
                    boxShadow: `0 8px 24px ${shadowCol}, 0 0 0 3px rgba(255,255,255,0.85)`,
                  }}
                >
                  <span>{artist.name[0]}</span>
                </div>
                <div className="artist-avatar-glow" />
                <span className="artist-play-indicator">
                  <i className="fa-solid fa-play" />
                </span>
              </div>

              <div className="artist-info">
                <div className="artist-name">{artist.name}</div>
                <div className="artist-hindi-name">{artist.hindiName}</div>
                <div className="artist-badge-pill">
                  <span>{artist.badge}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
