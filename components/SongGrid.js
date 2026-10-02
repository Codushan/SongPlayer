'use client';

import { useMemo, useState } from 'react';
import { CURATED_CATEGORIES, CENTURY_ERAS, songMatchesCategory, filterSongsByEra } from '@/data/playlists';
import './SongGrid.css';

export default function SongGrid({
  songs,
  visibleCount,
  viewMode = 'bars',
  genres,
  currentSong,
  isPlaying,
  favorites,
  onPlaySong,
  onToggleFavorite,
  onLoadMore,
  onResetFilters,
  activeGenreObj,
  activeArtist,
  activeAlbum,
  activePlaylist,
  onBack,
  backLabel,
  onPlayAll,
  onShuffleAll,
  quickFilter = 'all',
  onSelectQuickFilter,
  title,
  subtitle,
  // Singer profile genre sorting props
  activeArtistGenre = 'all',
  onSelectArtistGenre,
  artistBaseSongs = [],
  // Playlist century / era & pop/best sorting props
  playlistSort = 'best',
  onSelectPlaylistSort,
  playlistEra = 'all',
  onSelectPlaylistEra,
  playlistBaseSongs = [],
}) {
  const [hoveredSongId, setHoveredSongId] = useState(null);

  const visibleSongs = songs.slice(0, visibleCount);

  const genreFor = (song) =>
    genres.find((g) => g.id === song.genreId) || {
      icon: '🎵',
      accent: '#ff007a',
      name: song.genreName,
      gradient: 'linear-gradient(135deg, #ff007a, #7928ca)',
    };

  const handleCardClick = (song) => (e) => {
    if (e.target.closest('.btn-card-like') || e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    onPlaySong(song, songs);
  };

  const quickFilterTabs = [
    { id: 'all', label: 'All Songs', icon: 'fa-solid fa-list' },
    { id: 'popular', label: '🔥 Popular & Viral', icon: 'fa-solid fa-fire' },
    { id: 'chartbusters', label: '⭐ Chartbusters', icon: 'fa-solid fa-star' },
    { id: 'recent', label: '🆕 Latest (2020+)', icon: 'fa-solid fa-sparkles' },
    { id: 'classics', label: '📻 Vintage Classics', icon: 'fa-solid fa-compact-disc' },
  ];

  const artistCategoryCounts = useMemo(() => {
    if (!activeArtist || !artistBaseSongs.length) return {};
    const counts = {};
    for (const cat of CURATED_CATEGORIES) {
      counts[cat.id] = artistBaseSongs.filter((s) => songMatchesCategory(s, cat.id)).length;
    }
    return counts;
  }, [activeArtist, artistBaseSongs]);

  const playlistEraCounts = useMemo(() => {
    if (!activePlaylist || !playlistBaseSongs.length) return {};
    const counts = { all: playlistBaseSongs.length };
    for (const era of CENTURY_ERAS) {
      if (era.id !== 'all') {
        counts[era.id] = filterSongsByEra(playlistBaseSongs, era.id).length;
      }
    }
    return counts;
  }, [activePlaylist, playlistBaseSongs]);

  const hasActiveDrilldown = Boolean(activePlaylist || activeArtist || activeAlbum || (activeGenreObj && activeGenreObj.id !== 'all'));

  return (
    <div className="songs-display-wrapper">
      {/* Drill-in Detail Hero Banner with "← Go Back" navigation */}
      {hasActiveDrilldown && (
        <div className="drilldown-context-hero">
          <div className="drilldown-top-nav">
            {onBack && (
              <button className="drilldown-back-btn" onClick={onBack} title="Go Back">
                <i className="fa-solid fa-arrow-left" /> {backLabel || 'Back'}
              </button>
            )}
          </div>

          <div className="drilldown-hero-content">
            <div className="drilldown-avatar-wrap">
              {activePlaylist && (
                <div
                  className="drilldown-avatar playlist-avatar"
                  style={{ background: activePlaylist.gradient }}
                >
                  <span>{activePlaylist.icon}</span>
                </div>
              )}
              {activeArtist && !activePlaylist && (
                <div className="drilldown-avatar artist-avatar">
                  <span>{activeArtist[0]}</span>
                </div>
              )}
              {activeAlbum && !activePlaylist && (
                <div className="drilldown-avatar album-avatar">
                  <i className="fa-solid fa-compact-disc" />
                </div>
              )}
              {activeGenreObj && activeGenreObj.id !== 'all' && !activeArtist && !activeAlbum && !activePlaylist && (
                <div
                  className="drilldown-avatar genre-avatar"
                  style={{ background: activeGenreObj.gradient }}
                >
                  <span>{activeGenreObj.icon}</span>
                </div>
              )}
            </div>

            <div className="drilldown-details">
              <span className="drilldown-kicker">
                {activePlaylist
                  ? 'Curated Playlist'
                  : activeArtist
                    ? 'Singer & Star'
                    : activeAlbum
                      ? 'Album Soundtrack'
                      : 'Genre Hub'}
              </span>
              <h2 className="drilldown-title">
                {activePlaylist?.title || activeArtist || activeAlbum || activeGenreObj?.name}
              </h2>
              <p className="drilldown-subtitle">
                {activePlaylist?.description ||
                  (activeArtist
                    ? `Curated blockbuster hits by ${activeArtist}`
                    : activeAlbum
                      ? `Complete tracklist for album ${activeAlbum}`
                      : activeGenreObj?.tagline || activeGenreObj?.description)}
              </p>
              <div className="drilldown-meta-pills">
                <span className="meta-pill">
                  <i className="fa-solid fa-music" /> {songs.length} Tracks
                </span>
                {activePlaylist?.tag && (
                  <span className="meta-pill genre-pill-tag">
                    {activePlaylist.icon} {activePlaylist.tag}
                  </span>
                )}
                {activeGenreObj && activeGenreObj.id !== 'all' && !activePlaylist && (
                  <span className="meta-pill genre-pill-tag">
                    {activeGenreObj.icon} {activeGenreObj.name}
                  </span>
                )}
              </div>
            </div>

            <div className="drilldown-actions">
              {songs.length > 0 && (
                <>
                  <button
                    className="btn-primary drilldown-play-btn"
                    onClick={() => onPlayAll && onPlayAll(songs)}
                  >
                    <i className="fa-solid fa-play" /> Play All
                  </button>
                  <button
                    className="btn-secondary drilldown-shuffle-btn"
                    onClick={() => onShuffleAll && onShuffleAll(songs)}
                  >
                    <i className="fa-solid fa-shuffle" /> Shuffle
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          Singer Profile Genre Filter Bar (All + 16 Curated Categories)
         ================================================================= */}
      {activeArtist && onSelectArtistGenre && (
        <div className="singer-genre-filter-bar" id="singer-genre-filter-bar">
          <div className="drilldown-bar-header">
            <span className="drilldown-bar-title">
              {/* <i className="fa-solid fa-sliders" /> Filter by Category: */}
            </span>
            {/* <span className="drilldown-bar-hint">16 Curated Bhojpuri Categories &middot; Auto Sorted</span> */}
          </div>
          <div className="singer-genre-pills-scroll">
            <button
              type="button"
              className={`singer-genre-pill${(!activeArtistGenre || activeArtistGenre === 'all') ? ' active' : ''}`}
              onClick={() => onSelectArtistGenre('all')}
            >
              <span className="pill-icon">✨</span>
              <span className="pill-text">All Songs</span>
              <span className="singer-genre-count">{artistBaseSongs.length || songs.length}</span>
            </button>
            {CURATED_CATEGORIES.map((cat) => {
              const count = artistCategoryCounts[cat.id] ?? 0;
              const isActive = activeArtistGenre === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`singer-genre-pill${isActive ? ' active' : ''}`}
                  onClick={() => onSelectArtistGenre(cat.id)}
                  style={isActive ? { '--pill-accent': cat.accent } : undefined}
                >
                  <span className="pill-icon">{cat.icon}</span>
                  <span className="pill-text">{cat.name}</span>
                  <span className="singer-genre-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =================================================================
          Playlist Controls: Century / Era Sorting & Pop / Best Sorting
         ================================================================= */}
      {activePlaylist && (
        <div className="playlist-sorting-bar" id="playlist-sorting-bar">
          {/* Pop & Best Sort Row */}
          {onSelectPlaylistSort && (
            <div className="playlist-sort-row">
              <div className="playlist-sort-group">
                <span className="playlist-sort-label">
                  <i className="fa-solid fa-arrow-down-wide-short" /> Sort by:
                </span>
                <div className="playlist-sort-pills">
                  <button
                    type="button"
                    className={`sort-pill${playlistSort === 'best' ? ' active' : ''}`}
                    onClick={() => onSelectPlaylistSort('best')}
                  >
                    <i className="fa-solid fa-star" /> Best (Top Rated)
                  </button>
                  <button
                    type="button"
                    className={`sort-pill${playlistSort === 'pop' ? ' active' : ''}`}
                    onClick={() => onSelectPlaylistSort('pop')}
                  >
                    <i className="fa-solid fa-fire" /> Pop (Viral Hits)
                  </button>
                  <button
                    type="button"
                    className={`sort-pill${playlistSort === 'year-desc' ? ' active' : ''}`}
                    onClick={() => onSelectPlaylistSort('year-desc')}
                  >
                    <i className="fa-solid fa-calendar-arrow-down" /> Newest First
                  </button>
                  <button
                    type="button"
                    className={`sort-pill${playlistSort === 'year-asc' ? ' active' : ''}`}
                    onClick={() => onSelectPlaylistSort('year-asc')}
                  >
                    <i className="fa-solid fa-calendar-arrow-up" /> Oldest First
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Century / Era Filter Row */}
          {onSelectPlaylistEra && (
            <div className="playlist-era-row">
              <span className="playlist-sort-label">
                <i className="fa-solid fa-timeline" /> Century / Era:
              </span>
              <div className="playlist-era-pills-scroll">
                {CENTURY_ERAS.map((era) => {
                  const eraCount = playlistEraCounts[era.id] ?? 0;
                  const isEraActive = (playlistEra || 'all') === era.id;
                  return (
                    <button
                      key={era.id}
                      type="button"
                      className={`era-pill${isEraActive ? ' active' : ''}`}
                      onClick={() => onSelectPlaylistEra(era.id)}
                    >
                      <i className={era.icon} />
                      <span>{era.label}</span>
                      <span className="era-count-chip">{eraCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Page Title & Subtitle for views without drilldown */}
      {!hasActiveDrilldown && (title || subtitle) && (
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <div className="section-title-wrap">
            {title && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
      )}

      {/* Quick Filter Pill Bars (if filter selector provided) */}
      {onSelectQuickFilter && !hasActiveDrilldown && (
        <div className="quick-filter-bars">
          {quickFilterTabs.map((tab) => {
            const isTabActive = quickFilter === tab.id;
            return (
              <button
                key={tab.id}
                className={`quick-filter-pill${isTabActive ? ' active' : ''}`}
                onClick={() => onSelectQuickFilter(tab.id)}
              >
                <i className={tab.icon} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {visibleSongs.length === 0 && (
        <div id="songs-display-area" className="songs-empty-wrap">
          <div className="empty-state">
            <div className="empty-state-icon">📻</div>
            <h3>No Tracks Found</h3>
            <p>Try searching for another song, singer, or return to explore.</p>
            {onResetFilters && (
              <button
                className="btn-primary"
                id="btn-reset-filters"
                style={{ marginTop: '1.25rem' }}
                onClick={onResetFilters}
              >
                <i className="fa-solid fa-rotate-left" /> View All Tracks
              </button>
            )}
          </div>
        </div>
      )}

      {/* Songs Bar List / Grid Display */}
      {visibleSongs.length > 0 && (
        <div
          id="songs-display-area"
          className={viewMode === 'grid' ? 'songs-grid' : 'songs-bar-list'}
        >
          {viewMode === 'grid'
            ? visibleSongs.map((song) => {
              const playing = isPlaying && currentSong && currentSong.id === song.id;
              const liked = favorites ? favorites.has(song.id) : false;
              const genreObj = genreFor(song);
              const ytWatchUrl = song.youtubeUrl || `https://www.youtube.com/watch?v=${song.youtubeId}`;

              return (
                <div
                  key={song.id}
                  className={`song-card${playing ? ' playing' : ''}`}
                  data-song-id={song.id}
                  onClick={handleCardClick(song)}
                >
                  <div className="song-card-header">
                    <span className="song-genre-tag" style={{ background: genreObj.accent || '#ff007a' }}>
                      {genreObj.icon || '🎵'} {song.genreName}
                    </span>
                    <span className="song-card-year">{song.year}</span>
                  </div>

                  <div className="song-card-main">
                    <div className="song-thumbnail-wrap">
                      <img
                        src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`}
                        alt={song.title}
                        className="song-card-thumb-img"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="song-play-hover-btn">
                        <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-play'}`} />
                      </div>
                    </div>

                    <div className="song-info">
                      <div className="song-title" title={song.title}>
                        {song.title}
                      </div>
                      <div className="song-artist" title={song.singer}>
                        {song.singer}
                      </div>
                      <div className="song-meta-line" title={song.album}>
                        🎬 {song.album}
                      </div>
                    </div>
                  </div>

                  <div className="song-card-footer">
                    <span className="song-duration">
                      <i className="fa-regular fa-clock" /> {song.duration}
                    </span>

                    <div className="song-actions">
                      <a
                        href={ytWatchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-icon-btn yt-action"
                        title="Watch on YouTube"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fa-brands fa-youtube" />
                      </a>
                      <button
                        className={`action-icon-btn btn-card-like${liked ? ' liked' : ''}`}
                        data-song-id={song.id}
                        title={liked ? 'Remove Favorite' : 'Add to Favorites'}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleFavorite) onToggleFavorite(song.id);
                        }}
                      >
                        <i className={`${liked ? 'fa-solid' : 'fa-regular'} fa-heart`} />
                      </button>
                      <button
                        className="action-icon-btn btn-card-play"
                        data-song-id={song.id}
                        title={playing ? 'Pause' : 'Play Track'}
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlaySong(song, songs);
                        }}
                      >
                        <i className={`fa-solid ${playing ? 'fa-pause' : 'fa-circle-play'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
            : /* MODERN VISION-OS SONG BARS */
            visibleSongs.map((song, idx) => {
              const playing = isPlaying && currentSong && currentSong.id === song.id;
              const liked = favorites ? favorites.has(song.id) : false;
              const genreObj = genreFor(song);
              const ytWatchUrl = song.youtubeUrl || `https://www.youtube.com/watch?v=${song.youtubeId}`;

              return (
                <div
                  key={song.id}
                  className={`song-bar-item${playing ? ' playing active' : ''}`}
                  data-song-id={song.id}
                  onClick={handleCardClick(song)}
                  onMouseEnter={() => setHoveredSongId(song.id)}
                  onMouseLeave={() => setHoveredSongId(null)}
                >
                  {/* Track Number & Play indicator */}
                  <div className="song-bar-index">
                    {playing ? (
                      <div className="equalizer-bar-animated">
                        <span className="eq-bar" />
                        <span className="eq-bar" />
                        <span className="eq-bar" />
                        <span className="eq-bar" />
                      </div>
                    ) : (
                      <div className="index-container">
                        <span className="index-num">{(idx + 1).toString().padStart(2, '0')}</span>
                        <button
                          className="index-play-btn"
                          title={`Play "${song.title}"`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlaySong(song, songs);
                          }}
                        >
                          <i className="fa-solid fa-play" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Artwork */}
                  <div className="song-bar-thumb-box">
                    <img
                      src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`}
                      alt={song.title}
                      className="song-bar-thumb-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="song-bar-thumb-fallback" style={{ background: genreObj.gradient }}>
                      <span>{genreObj.icon || '🎵'}</span>
                    </div>
                    {playing && <div className="song-bar-thumb-pulse" />}
                  </div>

                  {/* Title and Singer Info */}
                  <div className="song-bar-main-info">
                    <div className="song-bar-title" title={song.title}>
                      <span className="title-text">{song.title}</span>
                      {song.year && <span className="song-year-tag">{song.year}</span>}
                    </div>
                    <div className="song-bar-artist" title={song.singer}>
                      <i className="fa-solid fa-microphone-lines artist-mic-icon" />
                      <span>{song.singer}</span>
                    </div>
                  </div>

                  {/* Album Name */}
                  <div className="song-bar-album" title={song.album}>
                    <span className="album-text">
                      <i className="fa-solid fa-compact-disc album-disc-icon" /> {song.album}
                    </span>
                  </div>

                  {/* Genre Tag Pill */}
                  <div className="song-bar-genre">
                    <span
                      className="song-bar-genre-badge"
                      style={{
                        background: genreObj.accent ? `${genreObj.accent}22` : 'rgba(255, 0, 122, 0.15)',
                        borderColor: genreObj.accent || 'rgba(255, 0, 122, 0.4)',
                        color: '#ff4d00ff',
                      }}
                    >
                      {genreObj.icon} {song.genreName}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="song-bar-duration">
                    <span>{song.duration}</span>
                  </div>

                  {/* Actions: Heart, YouTube, Play */}
                  <div className="song-bar-actions">
                    <button
                      className={`bar-action-btn btn-bar-like${liked ? ' liked' : ''}`}
                      title={liked ? 'Remove from favorites' : 'Add to favorites'}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleFavorite) onToggleFavorite(song.id);
                      }}
                    >
                      <i className={`${liked ? 'fa-solid' : 'fa-regular'} fa-heart`} />
                    </button>

                    <a
                      href={ytWatchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bar-action-btn btn-bar-yt"
                      title="Watch full video on YouTube"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fa-brands fa-youtube" />
                    </a>

                    <button
                      className="bar-action-btn btn-bar-play"
                      title={playing ? 'Pause' : 'Play Track'}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlaySong(song, songs);
                      }}
                    >
                      <i className={`fa-solid ${playing ? 'fa-circle-pause' : 'fa-circle-play'}`} />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Pagination / Load More */}
      {songs.length > visibleSongs.length && (
        <div className="pagination-container" id="pagination-container">
          <button className="btn-secondary load-more-vision" id="btn-load-more" onClick={onLoadMore}>
            <i className="fa-solid fa-chevron-down" /> Load More Tracks ({songs.length - visibleSongs.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
