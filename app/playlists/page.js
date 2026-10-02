'use client';

import Link from 'next/link';
import './page.css';
import { BHOJPURI_SONGS } from '@/data/songs';
import { CURATED_PLAYLISTS, getSongsForCategory } from '@/data/playlists';
import { useAudio } from '@/components/AudioContext';

export default function PlaylistsPage() {
  const { playSong } = useAudio();

  return (
    <section className="playlist-section" id="playlist-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <i className="fa-solid fa-list-check" style={{ color: 'var(--accent-primary)' }} />{' '}
            Curated Bhojpuri Playlists
          </h2>
        </div>
      </div>

      <div className="playlist-grid">
        {CURATED_PLAYLISTS.map((pl) => {
          const plSongs = getSongsForCategory(BHOJPURI_SONGS, pl.id);

          return (
            <Link
              key={pl.id}
              href={`/playlists/${pl.id}`}
              className="playlist-card"
              style={{
                '--pl-gradient': pl.gradient,
                '--pl-accent': pl.accent,
              }}
            >
              <div className="playlist-card-glow" />
              <div className="playlist-card-art">
                <span className="playlist-art-icon">{pl.icon}</span>
                <span className="playlist-tag-badge">{pl.tag}</span>
                <button
                  type="button"
                  className="playlist-play-fab"
                  title={`Play "${pl.title}"`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (plSongs.length > 0) playSong(plSongs[0]);
                  }}
                >
                  <i className="fa-solid fa-play" />
                </button>
              </div>

              <div className="playlist-card-body">
                <h3 className="playlist-card-title">{pl.name}</h3>
                <div className="playlist-hindi-title">{pl.hindiTitle}</div>
                <p className="playlist-card-desc">{pl.description}</p>
                <div className="playlist-card-footer">
                  <span className="playlist-track-count">
                    <i className="fa-solid fa-music" /> {plSongs.length} Tracks
                  </span>
                  <span className="playlist-enter-pill">
                    Listen <i className="fa-solid fa-arrow-right" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
