import Link from 'next/link';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-main-footer" aria-label="Footer">
      <div className="footer-inner">
        <div className="footer-brand-section">
          <Link href="/" className="footer-logo">
            <span className="footer-logo-badge">🎵</span>
            <span className="footer-logo-text">Bhojpuri Sur</span>
          </Link>
          <p className="footer-tagline">
            The ultimate cultural &amp; musical archive celebrating Bhojpuri heritage.
            1,500+ curated tracks spanning DJ hits, devotional Chhath geet, romantic classics, and timeless folk.
          </p>
          <div className="footer-audio-badge">
            <i className="fa-solid fa-bolt" /> 24-bit HD Lossless Audio Engine &bull; Zero Buffering
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <span className="footer-heading">Explore</span>
            <Link href="/songs" className="footer-link">All Songs (1,500+)</Link>
            <Link href="/singers" className="footer-link">Top Singers</Link>
            <Link href="/albums" className="footer-link">Film Albums</Link>
            <Link href="/genres" className="footer-link">Music Genres</Link>
          </div>

          <div className="footer-col">
            <span className="footer-heading">Collections</span>
            <Link href="/playlists" className="footer-link">Curated Mixes</Link>
            <Link href="/favorites" className="footer-link">Liked Songs</Link>
            <Link href="/genres/dj-dance" className="footer-link">DJ Dance Hits</Link>
            <Link href="/genres/chhath" className="footer-link">Chhath Mahaparv</Link>
          </div>

          <div className="footer-col">
            <span className="footer-heading">Legends</span>
            <Link href="/singers/Pawan%20Singh" className="footer-link">Pawan Singh</Link>
            <Link href="/singers/Khesari%20Lal%20Yadav" className="footer-link">Khesari Lal Yadav</Link>
            <Link href="/singers/Sharda%20Sinha" className="footer-link">Sharda Sinha</Link>
            <Link href="/singers/Manoj%20Tiwari" className="footer-link">Manoj Tiwari</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Bhojpuri Sur. Curated with love for regional Indian music culture.
          </p>
          <div className="footer-specs">
            <span className="footer-spec-chip">1,500+ Regional Tracks</span>
            <span className="footer-spec-chip">1962 &ndash; 2026 Archive</span>
            <span className="footer-spec-chip">Lossless Stereo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
