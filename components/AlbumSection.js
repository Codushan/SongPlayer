'use client';

import { useMemo } from 'react';
import './AlbumSection.css';

export default function AlbumSection({
  songs,
  activeAlbum,
  onSelectAlbum,
  onClearAlbum,
  onPlayAlbum,
}) {
  const albums = useMemo(() => {
    const map = new Map();
    (songs || []).forEach((song) => {
      const albumName = song.album || 'Single / Special';
      if (!map.has(albumName)) {
        map.set(albumName, {
          name: albumName,
          leadSinger: song.singer,
          year: song.year,
          genreName: song.genreName,
          genreId: song.genreId,
          coverSong: song,
          count: 0,
          songs: [],
        });
      }
      const entry = map.get(albumName);
      entry.count += 1;
      entry.songs.push(song);
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [songs]);

  return (
    <section className="album-section" id="album-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2>
            <i className="fa-solid fa-compact-disc" style={{ color: 'var(--accent-primary)' }} />{' '}
            Bhojpuri Albums &amp; Soundtracks
          </h2>
          <p>Explore blockbuster movie albums, iconic cassettes &amp; viral EP collections</p>
        </div>
        <div className="section-actions">
          {activeAlbum && (
            <button className="filter-btn active" onClick={onClearAlbum}>
              <i className="fa-solid fa-xmark" /> Clear Album Filter
            </button>
          )}
        </div>
      </div>

      <div className="album-grid">
        {albums.slice(0, 32).map((album) => {
          const isActive = activeAlbum === album.name;
          const coverYt = album.coverSong?.youtubeId;

          return (
            <div
              key={album.name}
              className={`album-card${isActive ? ' active' : ''}`}
              onClick={() => onSelectAlbum(album.name)}
              role="button"
              tabIndex={0}
            >
              <div className="album-art-wrap">
                {coverYt ? (
                  <img
                    src={`https://img.youtube.com/vi/${coverYt}/mqdefault.jpg`}
                    alt={album.name}
                    className="album-cover-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="album-cover-placeholder">
                    <i className="fa-solid fa-music" />
                  </div>
                )}
                <div className="album-glass-overlay">
                  <button
                    className="album-play-fab"
                    title={`Play album "${album.name}"`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onPlayAlbum) onPlayAlbum(album.songs[0]);
                      else onSelectAlbum(album.name);
                    }}
                  >
                    <i className="fa-solid fa-play" />
                  </button>
                </div>
                <span className="album-year-pill">{album.year}</span>
              </div>

              <div className="album-card-info">
                <h3 className="album-card-title" title={album.name}>
                  {album.name}
                </h3>
                <p className="album-card-artist" title={album.leadSinger}>
                  {album.leadSinger}
                </p>
                <div className="album-card-meta">
                  <span className="album-track-badge">
                    <i className="fa-solid fa-music" /> {album.count} {album.count === 1 ? 'Track' : 'Tracks'}
                  </span>
                  <span className="album-genre-pill">{album.genreName}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
