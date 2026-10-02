'use client';

import { useState, useRef, useEffect } from 'react';
import './BottomPlayer.css';

function formatTime(totalSeconds) {
  if (!isFinite(totalSeconds) || totalSeconds < 0) return '0:00';
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function BottomPlayer({
  song,
  genreObj,
  isPlaying,
  isShuffle,
  isRepeat,
  currentTime,
  duration,
  volume,
  isLiked,
  onTogglePlayPause,
  onNext,
  onPrev,
  onToggleShuffle,
  onToggleRepeat,
  onSeek,
  onToggleLike,
  onVolumeChange,
  onToggleMute,
  queue,
  onPlaySong,
  onToggleFavorite,
  favorites,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('upnext');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const listRef = useRef(null);

  // Auto-scroll active song into view when panel opens
  useEffect(() => {
    if (isExpanded && listRef.current && song) {
      const activeEl = listRef.current.querySelector('.queue-item.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isExpanded, song]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && isExpanded) setIsExpanded(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isExpanded]);

  if (!song) return null;

  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const ytWatchUrl = song.youtubeUrl || `https://www.youtube.com/watch?v=${song.youtubeId}`;

  const handleScrubberClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(ratio * duration);
  };

  const volumeIconClass =
    volume === 0
      ? 'fa-solid fa-volume-xmark'
      : volume < 50
        ? 'fa-solid fa-volume-low'
        : 'fa-solid fa-volume-high';

  return (
    <>
      {/* Backdrop overlay for expanded panel */}
      {isExpanded && (
        <div
          className="player-panel-overlay"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* EXPANDED FULL-SCREEN VISION-OS PLAYER MODAL */}
      <div
        className={`player-expanded-panel${isExpanded ? ' open' : ''}`}
        id="player-expanded-panel"
      >
        {/* Dynamic 3D Iridescent Fluid Mesh Background */}
        <div
          className="expanded-fluid-bg"
          style={{
            background: genreObj?.gradient || 'linear-gradient(135deg, #ff007a 0%, #7928ca 50%, #0070f3 100%)',
          }}
        >
          <div className="fluid-wave-mesh wave-1" />
          <div className="fluid-wave-mesh wave-2" />
          <div className="fluid-wave-mesh wave-3" />
        </div>

        {/* Modal Top Header Bar */}
        <div className="expanded-top-bar">
          <button
            className="expanded-close-btn"
            onClick={() => setIsExpanded(false)}
            title="Minimize Player"
          >
            <i className="fa-solid fa-chevron-down" />
          </button>

          <div className="expanded-header-pill">
            <span className="live-dot" />
            <span>Now Playing</span>
            <span className="quality-tag">Lossless Sur HD</span>
          </div>

          <div className="expanded-header-actions">
            <button
              className={`panel-action-btn${isLiked ? ' liked' : ''}`}
              onClick={onToggleLike}
              title={isLiked ? 'Remove Favorite' : 'Add to Favorites'}
            >
              <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
            </button>
            <a
              href={ytWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="panel-action-btn yt"
              title="Watch full video on YouTube"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fa-brands fa-youtube" />
            </a>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="expanded-body-layout">
          {/* Left / Center: Grand Artwork, Visualizer, Info & Primary Controls */}
          <div className="expanded-main-stage">
            {/* 3D Vinyl / Artwork Container */}
            <div className="expanded-artwork-container">
              <div className={`expanded-vinyl-disc${isPlaying ? ' spinning' : ''}`}>
                <div className="vinyl-grooves" />
                <div className="vinyl-center-label" style={{ background: genreObj?.gradient }}>
                  <span>{genreObj?.icon || '🎵'}</span>
                </div>
              </div>

              <div className="expanded-art-card">
                <img
                  src={`https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`}
                  alt={song.title}
                  className="expanded-art-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://i.ytimg.com/vi/${song.youtubeId}/mqdefault.jpg`;
                  }}
                />
                <div className="art-card-glass-shine" />
                <span
                  className="art-genre-chip"
                  style={{ background: genreObj?.accent || 'var(--accent-primary)' }}
                >
                  {genreObj?.icon || '🎵'} {song.genreName}
                </span>
              </div>
            </div>

            {/* Track Info */}
            <div className="expanded-track-info">
              <h2 className="expanded-title" title={song.title}>
                {song.title}
              </h2>
              <p className="expanded-artist">
                <i className="fa-solid fa-microphone-lines mic-icon" /> {song.singer}
              </p>
              <p className="expanded-album">
                <i className="fa-solid fa-compact-disc disc-icon" /> {song.album} &middot; {song.year}
              </p>
            </div>

            {/* Live Audio Visualizer Waves */}
            <div className="expanded-visualizer-bar">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className={`visualizer-stem${isPlaying ? ' active' : ''}`}
                  style={{
                    animationDelay: `${(i % 8) * 0.12}s`,
                    animationDuration: `${0.6 + (i % 5) * 0.18}s`,
                  }}
                />
              ))}
            </div>

            {/* Scrubber Timeline */}
            <div className="expanded-scrubber-box">
              <div className="expanded-scrubber-bar" onClick={handleScrubberClick}>
                <div className="expanded-scrubber-fill" style={{ width: `${pct}%` }}>
                  <div className="scrubber-thumb-glow" />
                </div>
              </div>
              <div className="expanded-time-labels">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Primary Control Buttons */}
            <div className="expanded-controls-dock">
              <button
                className={`exp-ctrl-btn${isShuffle ? ' active' : ''}`}
                title="Shuffle"
                onClick={onToggleShuffle}
              >
                <i className="fa-solid fa-shuffle" />
              </button>
              <button className="exp-ctrl-btn" title="Previous Song" onClick={onPrev}>
                <i className="fa-solid fa-backward-step" />
              </button>
              <button
                className="exp-ctrl-btn exp-play-btn"
                title="Play / Pause"
                onClick={onTogglePlayPause}
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
              </button>
              <button className="exp-ctrl-btn" title="Next Song" onClick={onNext}>
                <i className="fa-solid fa-forward-step" />
              </button>
              <button
                className={`exp-ctrl-btn${isRepeat ? ' active' : ''}`}
                title="Repeat"
                onClick={onToggleRepeat}
              >
                <i className="fa-solid fa-repeat" />
              </button>
            </div>

            {/* Volume & Quality Footer in Stage */}
            <div className="expanded-stage-footer">
              <div className="stage-volume-wrap">
                <button className="stage-mute-btn" onClick={onToggleMute}>
                  <i className={volumeIconClass} />
                </button>
                <input
                  type="range"
                  className="stage-volume-slider"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseInt(e.target.value, 10))}
                />
                <span className="stage-vol-pct">{volume}%</span>
              </div>
            </div>
          </div>

          {/* Right Side: Tabbed Glass Details & Queue Drawer */}
          <div className="expanded-side-panel">
            {/* Tabs */}
            <div className="expanded-tabs-nav">
              <button
                className={`exp-tab-btn${activeTab === 'upnext' ? ' active' : ''}`}
                onClick={() => setActiveTab('upnext')}
              >
                <i className="fa-solid fa-list-ul" />
                <span className="tab-label-full">Up Next ({queue ? queue.length : 0})</span>
                <span className="tab-label-short">Queue ({queue ? queue.length : 0})</span>
              </button>
              <button
                className={`exp-tab-btn${activeTab === 'details' ? ' active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <i className="fa-solid fa-circle-info" />
                <span className="tab-label-full">Credits &amp; Details</span>
                <span className="tab-label-short">Details</span>
              </button>
              <button
                className={`exp-tab-btn${activeTab === 'vibes' ? ' active' : ''}`}
                onClick={() => setActiveTab('vibes')}
              >
                <i className="fa-solid fa-sparkles" />
                <span className="tab-label-full">Sur Vibes</span>
                <span className="tab-label-short">Vibes</span>
              </button>
            </div>

            {/* TAB 1: Up Next Queue */}
            {activeTab === 'upnext' && (
              <div className="exp-queue-container" ref={listRef}>
                {(queue || []).map((s, idx) => {
                  const isActive = s.id === song.id;
                  const isLikedSong = favorites ? favorites.has(s.id) : false;
                  return (
                    <div
                      key={s.id}
                      className={`exp-queue-card${isActive ? ' active' : ''}`}
                      onClick={() => onPlaySong && onPlaySong(s)}
                    >
                      <div className="queue-card-idx">
                        {isActive ? (
                          isPlaying ? (
                            <div className="queue-eq-bars">
                              <span className="q-bar" />
                              <span className="q-bar" />
                              <span className="q-bar" />
                            </div>
                          ) : (
                            <i className="fa-solid fa-play" style={{ color: 'var(--accent-primary)' }} />
                          )
                        ) : (
                          <span>{(idx + 1).toString().padStart(2, '0')}</span>
                        )}
                      </div>

                      <div className="queue-card-thumb">
                        <img
                          src={`https://img.youtube.com/vi/${s.youtubeId}/mqdefault.jpg`}
                          alt={s.title}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>

                      <div className="queue-card-text">
                        <div className="queue-card-title">{s.title}</div>
                        <div className="queue-card-artist">
                          {s.singer} &middot; {s.year}
                        </div>
                      </div>

                      <div className="queue-card-actions">
                        <button
                          className={`queue-card-heart${isLikedSong ? ' liked' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleFavorite) onToggleFavorite(s.id);
                          }}
                        >
                          <i className={isLikedSong ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
                        </button>
                        <span className="queue-card-duration">{s.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 2: Song Details & Film Credits */}
            {activeTab === 'details' && (
              <div className="exp-details-container">
                <div className="credits-card">
                  <h3 className="credits-heading">
                    <i className="fa-solid fa-circle-nodes" /> Production &amp; Film Metadata
                  </h3>
                  <div className="credits-grid">
                    {[
                      { label: 'Song Title', val: song.title, icon: 'fa-music' },
                      { label: 'Lead Singer(s)', val: song.singer, icon: 'fa-microphone' },
                      { label: 'Album / Film', val: song.album, icon: 'fa-compact-disc' },
                      { label: 'Genre Category', val: song.genreName, icon: 'fa-layer-group' },
                      { label: 'Release Year', val: song.year, icon: 'fa-calendar' },
                      { label: 'Duration', val: song.duration, icon: 'fa-clock' },
                      { label: 'Music Director', val: song.composer, icon: 'fa-wand-magic-sparkles' },
                      { label: 'Lyricist / Writer', val: song.writer, icon: 'fa-pen-nib' },
                      { label: 'Starring Cast', val: song.starring, icon: 'fa-star' },
                      { label: 'Record Label', val: song.label, icon: 'fa-building' },
                    ].map(({ label, val, icon }) => (
                      <div className="credits-item" key={label}>
                        <div className="credits-item-label">
                          <i className={`fa-solid ${icon}`} /> {label}
                        </div>
                        <div className="credits-item-val">{val || '—'}</div>
                      </div>
                    ))}
                  </div>

                  <div className="credits-footer-action">
                    <a
                      href={ytWatchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary credits-yt-btn"
                    >
                      <i className="fa-brands fa-youtube" /> Watch Official Music Video
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Sur Vibes & Trivia */}
            {activeTab === 'vibes' && (
              <div className="exp-vibes-container">
                <div className="vibes-card">
                  <div className="vibes-icon">{genreObj?.icon || '✨'}</div>
                  <h3>{genreObj?.name || 'Bhojpuri Sur'}</h3>
                  <p className="vibes-desc">
                    {genreObj?.description || 'Authentic regional folk, classical melodies and modern chartbusters.'}
                  </p>
                  <div className="vibes-stats-badge">
                    <span>⚡ 24-bit 48kHz HD Audio Engine</span>
                    <span>📻 Stereo Spatial Immersion</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FLOATING MINI BOTTOM PLAYER BAR (VISION-OS CAPSULE) */}
      <footer className="vision-bottom-dock" id="bottom-player">
        <div className="vision-player-capsule">
          {/* Left: Track Artwork & Info */}
          <div
            className="vision-capsule-left"
            onClick={() => setIsExpanded((v) => !v)}
            role="button"
            tabIndex={0}
            title="Expand Fullscreen Player"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsExpanded((v) => !v);
              }
            }}
          >
            <div
              className={`capsule-thumb-wrap${isPlaying ? ' spinning' : ''}`}
              style={{ background: genreObj?.gradient || 'linear-gradient(135deg, #ff007a, #7928ca)' }}
            >
              <img
                src={`https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`}
                alt={song.title}
                className="capsule-thumb-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="capsule-thumb-icon">{genreObj?.icon || '🎵'}</span>
            </div>

            <div className="capsule-info">
              <div className="capsule-title" id="player-title">
                {song.title}
              </div>
              <div className="capsule-artist" id="player-artist">
                {song.singer} &middot; {song.album}
              </div>
            </div>

            <button className="capsule-expand-btn" aria-label="Expand player">
              <i className="fa-solid fa-chevron-up" />
            </button>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="vision-capsule-center">
            <div className="capsule-controls">
              <button
                className={`capsule-btn${isShuffle ? ' active' : ''}`}
                title="Shuffle"
                onClick={onToggleShuffle}
              >
                <i className="fa-solid fa-shuffle" />
              </button>
              <button className="capsule-btn" title="Previous" onClick={onPrev}>
                <i className="fa-solid fa-backward-step" />
              </button>
              <button
                className="capsule-btn capsule-play-pause"
                title="Play / Pause"
                onClick={onTogglePlayPause}
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
              </button>
              <button className="capsule-btn" title="Next" onClick={onNext}>
                <i className="fa-solid fa-forward-step" />
              </button>
              <button
                className={`capsule-btn${isRepeat ? ' active' : ''}`}
                title="Repeat"
                onClick={onToggleRepeat}
              >
                <i className="fa-solid fa-repeat" />
              </button>
            </div>

            <div className="capsule-scrubber-line">
              <span className="scrubber-time">{formatTime(currentTime)}</span>
              <div className="capsule-scrubber-bar" onClick={handleScrubberClick}>
                <div className="capsule-scrubber-fill" style={{ width: `${pct}%` }}>
                  <div className="capsule-scrubber-thumb" />
                </div>
              </div>
              <span className="scrubber-time">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Actions, Volume & YouTube */}
          <div className="vision-capsule-right">
            <button
              className={`capsule-action-btn${isLiked ? ' liked' : ''}`}
              title={isLiked ? 'Remove Favorite' : 'Add to Favorites'}
              onClick={onToggleLike}
            >
              <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} />
            </button>

            <a
              href={ytWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="capsule-action-btn yt"
              title="Watch on YouTube"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fa-brands fa-youtube" />
            </a>

            <button
              className="capsule-action-btn"
              title="View Queue & Lyrics"
              onClick={() => {
                setActiveTab('upnext');
                setIsExpanded(true);
              }}
            >
              <i className="fa-solid fa-list-ul" />
            </button>

            {/* <div className="capsule-volume-wrap">
              <button className="capsule-vol-btn" onClick={onToggleMute} title="Mute / Unmute">
                <i className={volumeIconClass} />
              </button>
              <input
                type="range"
                className="capsule-vol-slider"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => onVolumeChange(parseInt(e.target.value, 10))}
              />
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
}
