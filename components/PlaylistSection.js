'use client';

import { useMemo } from 'react';
import { getSongsForCategory } from '@/data/playlists';

export default function PlaylistSection({
  playlists,
  songs,
  activePlaylist,
  onSelectPlaylist,
  onClearPlaylist,
  onPlayPlaylist,
}) {
  const playlistsWithCounts = useMemo(() => {
    return (playlists || []).map((pl) => {
      const plSongs = getSongsForCategory(songs, pl.id);
      return {
        ...pl,
        songs: plSongs,
        count: plSongs.length,
      };
    });
  }, [playlists, songs]);

  return (
    <section className="playlist-section" id="playlist-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <i className="fa-solid fa-list-check" style={{ color: 'var(--accent-primary)' }} />{' '}
            Curated Bhojpuri Playlists
          </h2>
        </div>
        <div className="section-actions">
          {activePlaylist && (
            <button className="filter-btn active" onClick={onClearPlaylist}>
              <i className="fa-solid fa-xmark" /> Clear Playlist Filter
            </button>
          )}
        </div>
      </div>

      <div className="playlist-grid">
        {playlistsWithCounts.map((pl) => {
          const isActive = activePlaylist?.id === pl.id;

          return (
            <div
              key={pl.id}
              className={`playlist-card${isActive ? ' active' : ''}`}
              style={{
                '--pl-gradient': pl.gradient,
                '--pl-accent': pl.accent,
              }}
              onClick={() => onSelectPlaylist(pl)}
              role="button"
              tabIndex={0}
            >
              <div className="playlist-card-glow" />
              <div className="playlist-card-art">
                <span className="playlist-art-icon">{pl.icon}</span>
                <span className="playlist-tag-badge">{pl.tag}</span>
                <button
                  className="playlist-play-fab"
                  title={`Play "${pl.title}"`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onPlayPlaylist && pl.songs.length > 0) {
                      onPlayPlaylist(pl.songs[0]);
                    } else {
                      onSelectPlaylist(pl);
                    }
                  }}
                >
                  <i className="fa-solid fa-play" />
                </button>
              </div>

              <div className="playlist-card-body">
                <h3 className="playlist-card-title">{pl.title}</h3>
                <p className="playlist-card-desc">{pl.description}</p>
                <div className="playlist-card-footer">
                  <span className="playlist-track-count">
                    <i className="fa-solid fa-music" /> {pl.count} Tracks
                  </span>
                  <span className="playlist-enter-pill">
                    Listen <i className="fa-solid fa-arrow-right" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
