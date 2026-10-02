'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { BHOJPURI_SONGS, BHOJPURI_ARTISTS } from '@/data/songs';
import { CURATED_PLAYLISTS } from '@/data/playlists';
import { useAudio } from '@/components/AudioContext';
import './Header.css';

const TRENDING_SEARCHES = [
  'Pawan Singh',
  'Khesari Lal',
  'Chhath Geet',
  'DJ Dance',
  'Lollypop',
  'Sharda Sinha',
  'Bhakti',
];

export default function Header({
  searchQuery: propQuery,
  onSearchChange: propOnChange,
  onSearchClear: propOnClear,
}) {
  const router = useRouter();
  const { favorites, handleShuffleAll, playSong } = useAudio();
  const [localQuery, setLocalQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  const query = propQuery !== undefined ? propQuery : localQuery;
  const trimmed = query.trim().toLowerCase();

  // Instant in-memory search across songs, artists, and playlists
  const searchResults = useMemo(() => {
    if (!trimmed) return null;

    const matchedSongs = BHOJPURI_SONGS.filter((s) => {
      const title = (s.title || '').toLowerCase();
      const singer = (s.singer || '').toLowerCase();
      const album = (s.album || '').toLowerCase();
      const genre = (s.genre || '').toLowerCase();
      return (
        title.includes(trimmed) ||
        singer.includes(trimmed) ||
        album.includes(trimmed) ||
        genre.includes(trimmed)
      );
    });

    const matchedArtists = BHOJPURI_ARTISTS.filter((a) =>
      a.name.toLowerCase().includes(trimmed)
    ).slice(0, 3);

    const matchedPlaylists = CURATED_PLAYLISTS.filter(
      (p) =>
        p.title.toLowerCase().includes(trimmed) ||
        p.name.toLowerCase().includes(trimmed) ||
        p.id.toLowerCase().includes(trimmed) ||
        (p.keywords && p.keywords.some((k) => k.includes(trimmed)))
    ).slice(0, 3);

    return {
      songs: matchedSongs.slice(0, 5),
      totalSongs: matchedSongs.length,
      artists: matchedArtists,
      playlists: matchedPlaylists,
    };
  }, [trimmed]);

  const handleSearchInput = (val) => {
    if (propOnChange) {
      propOnChange(val);
    } else {
      setLocalQuery(val);
    }
    setIsOpen(true);
  };

  const handleClear = () => {
    if (propOnClear) {
      propOnClear();
    } else {
      setLocalQuery('');
    }
    setIsOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const executeSearch = useCallback((searchTerm) => {
    const target = (searchTerm !== undefined ? searchTerm : query).trim();
    setIsOpen(false);
    if (target) {
      router.push(`/songs?q=${encodeURIComponent(target)}`);
    } else {
      router.push('/songs');
    }
  }, [query, router]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  return (
    <header className="app-header vision-header">
      <Link href="/" className="brand-container" id="btn-brand-home" title="Bhojpuri Sur - Home">
        <div className="brand-logo-icon">
          <span className="brand-glow-dot" />
          <span className="brand-glow-music">🎵</span>
        </div>
        <div className="brand-text">
          <h1>Bhojpuri Sur</h1>
          <p>Vision Audio &middot; 1,500+ Tracks</p>
        </div>
      </Link>

      <div className="header-search" ref={searchContainerRef}>
        <div className="search-input-wrapper vision-search-pill">
          <i className="fa-solid fa-magnifying-glass search-icon" />
          <input
            ref={inputRef}
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Search songs, singers, albums, or genres... (e.g. Lollypop, Pawan Singh, Chhath)"
            autoComplete="off"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => handleSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="search-shortcut" id="search-shortcut">/</span>
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              id="search-clear-btn"
              title="Clear search"
              onClick={handleClear}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          )}
        </div>

        {/* Instant VisionOS Suggestions Dropdown */}
        {isOpen && (
          <div className="search-suggestions-dropdown">
            {trimmed ? (
              searchResults && (searchResults.songs.length > 0 || searchResults.artists.length > 0 || searchResults.playlists.length > 0) ? (
                <>
                  {/* Matching Songs */}
                  {searchResults.songs.length > 0 && (
                    <div className="suggestion-section">
                      <div className="suggestion-section-title">
                        <i className="fa-solid fa-music" /> Top Song Matches
                      </div>
                      <div className="suggestion-songs-list">
                        {searchResults.songs.map((song) => (
                          <div
                            key={song.id}
                            className="suggestion-song-item"
                            onClick={() => {
                              playSong(song);
                              setIsOpen(false);
                            }}
                          >
                            <img
                              src={`https://img.youtube.com/vi/${song.youtubeId}/default.jpg`}
                              alt={song.title}
                              className="suggestion-song-thumb"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="suggestion-song-info">
                              <span className="suggestion-song-title">{song.title}</span>
                              <span className="suggestion-song-singer">{song.singer}</span>
                            </div>
                            <span className="suggestion-song-duration">{song.duration}</span>
                            <button
                              type="button"
                              className="suggestion-play-btn"
                              title={`Play "${song.title}"`}
                              onClick={(e) => {
                                e.stopPropagation();
                                playSong(song, true, searchResults.songs, 'Search Results');
                                setIsOpen(false);
                              }}
                            >
                              <i className="fa-solid fa-play" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Artists */}
                  {searchResults.artists.length > 0 && (
                    <div className="suggestion-section">
                      <div className="suggestion-section-title">
                        <i className="fa-solid fa-microphone-lines" /> Artists & Singers
                      </div>
                      <div className="suggestion-chips-row">
                        {searchResults.artists.map((artist) => (
                          <Link
                            key={artist.name}
                            href={`/singers/${encodeURIComponent(artist.name)}`}
                            className="suggestion-artist-chip"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="suggestion-avatar">{artist.name[0]}</span>
                            <span>{artist.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Playlists */}
                  {searchResults.playlists.length > 0 && (
                    <div className="suggestion-section">
                      <div className="suggestion-section-title">
                        <i className="fa-solid fa-list-check" /> Curated Playlists
                      </div>
                      <div className="suggestion-chips-row">
                        {searchResults.playlists.map((pl) => (
                          <Link
                            key={pl.id}
                            href={`/playlists/${pl.id}`}
                            className="suggestion-playlist-chip"
                            onClick={() => setIsOpen(false)}
                          >
                            <span>{pl.icon}</span>
                            <span>{pl.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View All Matches in Catalog */}
                  <button
                    type="button"
                    className="suggestion-footer-action"
                    onClick={() => executeSearch()}
                  >
                    <span>
                      <i className="fa-solid fa-magnifying-glass" /> View all{' '}
                      <strong>{searchResults.totalSongs}</strong> tracks for &ldquo;{query}&rdquo;
                    </span>
                    <span className="enter-badge">↵ Enter</span>
                  </button>
                </>
              ) : (
                <div className="suggestion-empty-state">
                  <span className="empty-icon">🔍</span>
                  <p>No matches found for &ldquo;{query}&rdquo;</p>
                  <span className="empty-hint">Try searching for Pawan Singh, Chhath, or DJ Dance</span>
                </div>
              )
            ) : (
              /* Trending Searches when focused without typing */
              <div className="suggestion-trending-wrap">
                <div className="suggestion-section-title">
                  <i className="fa-solid fa-fire" style={{ color: 'var(--accent-primary)' }} /> Trending Searches
                </div>
                <div className="suggestion-chips-row">
                  {TRENDING_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      className="suggestion-trend-chip"
                      onClick={() => {
                        handleSearchInput(term);
                        if (inputRef.current) inputRef.current.focus();
                      }}
                    >
                      <span>🔍</span> {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header-actions">
        <Link
          href="/favorites"
          className="header-btn vision-header-pill header-favorites-btn"
          id="btn-favorites"
          title="Liked Songs"
        >
          <i className="fa-solid fa-heart heart-accent" />
          <span className="btn-label">Favorites</span>
          <span className="badge-count" id="favorites-badge">{favorites.size}</span>
        </Link>

        <button
          className="header-btn vision-header-pill radio-pill"
          id="btn-shuffle-all"
          title="Play Bhojpuri Sur Radio"
          onClick={() => handleShuffleAll()}
        >
          <i className="fa-solid fa-shuffle" />
          <span className="btn-label">Radio</span>
        </button>
      </div>
    </header>
  );
}
