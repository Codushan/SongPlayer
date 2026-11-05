'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { BHOJPURI_SONGS, BHOJPURI_GENRES, BHOJPURI_ARTISTS } from '@/data/songs';
import { CURATED_PLAYLISTS, getSongsForCategory } from '@/data/playlists';
import { useAudio } from '@/components/AudioContext';
import HeroShowcase from '@/components/HeroShowcase';
import SongGrid from '@/components/SongGrid';
import './page.css';

export default function HomePage() {
  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlayPause,
    favorites,
    toggleFavorite,
    handleShuffleAll,
    handlePlayAll,
  } = useAudio();

  const homeTrendingSongs = useMemo(() => {
    return BHOJPURI_SONGS.slice(0, 6);
  }, []);

  // All Chhath Mahaparv songs
  const allChhathSongs = useMemo(() => {
    return getSongsForCategory(BHOJPURI_SONGS, 'chhath_geet');
  }, []);

  // Curated showcase of highest-streamed & iconic Chhath songs based on verified web popularity
  const homeChhathSongs = useMemo(() => {
    const priorityIds = [
      'chhath_track_2022_8', // Sheetli Bayariya (Jal Beech Khada Hoee) - Pawan Singh, Palak Muchhal
      'chhath_track_1986_4', // Kelwa Ke Paat Par - Sharda Sinha (~210M+ plays, all-time #1 anthem)
      'chhath_track_2016_1', // Pahile Pahil Chhathi Maiya - Sharda Sinha (~80M+ views)
      'chhath_track_1986_3', // Ho Deenanath - Sharda Sinha (~170M+ plays)
      'chhath_track_1998_2', // Uga Ho Surujdev Bhel Bhinsarva - Anuradha Paudwal (~480M+ cumulative plays)
      'pawan_chhath_track_2012_3', // Kaanch Hi Baans Ke Bahangiya - Pawan Singh, Palak
      'pawan_chhath_track_2021_1', // Jai Chhathi Maiya - Sonu Nigam, Pawan Singh
      'pawan_chhath_track_2021_2', // Babua Je Rahite - Pawan Singh (~45M+ views)
      'chhath_track_1986_1', // Baanjhin Kewdawa Dhaile Thaadh - Sharda Sinha (~30M+ views)
    ];

    const topPicks = priorityIds
      .map((id) => allChhathSongs.find((s) => s.id === id))
      .filter(Boolean);

    const remaining = allChhathSongs.filter((s) => !priorityIds.includes(s.id));
    return [...topPicks, ...remaining].slice(0, 6);
  }, [allChhathSongs]);

  // Featured Curated Playlists for Home (ensuring Chhath Geet is featured up front)
  const homeFeaturedPlaylists = useMemo(() => {
    const featuredIds = ['chhath_geet', 'dj', 'bhakti', 'love_song'];
    const featured = featuredIds
      .map((id) => CURATED_PLAYLISTS.find((p) => p.id === id))
      .filter(Boolean);
    const others = CURATED_PLAYLISTS.filter((p) => !featuredIds.includes(p.id));
    return [...featured, ...others].slice(0, 4);
  }, []);

  return (
    <section className="home-minimal-view">
      {/* Minimalist Hero Spotlight */}
      <div className="hero-minimal-card">
        <div className="hero-minimal-content">
          <div className="hero-minimal-badge">
            <i className="fa-solid fa-sparkles" /> Bhojpuri Sur &middot; Vision Audio
          </div>
          <h2 className="hero-minimal-title">
            Authentic Desi Melodies &amp; <span>Blockbuster Beats</span>
          </h2>
          <p className="hero-minimal-desc">
            Stream 1,500+ curated tracks from legendary folk icons to today&apos;s chartbusters.
          </p>

          <div className="hero-minimal-actions">
            <button
              className="btn-primary"
              onClick={() => handleShuffleAll(BHOJPURI_SONGS)}
            >
              <i className="fa-solid fa-play" /> Start Radio
            </button>
            <Link href="/playlists/chhath_geet" className="btn-secondary btn-chhath-pill">
              <i className="fa-solid fa-sun" style={{ color: '#f59e0b' }} /> Chhath Special
            </Link>
            <Link href="/playlists" className="btn-secondary">
              <i className="fa-solid fa-list-check" /> Browse Playlists
            </Link>
            <Link href="/songs" className="btn-secondary">
              <i className="fa-solid fa-music" /> All Songs
            </Link>
          </div>
        </div>

        {/* Rotating Showcase */}
        <HeroShowcase />
      </div>

      {/* Chhath Mahaparv Special Section in Main Panel */}
      <div className="home-section-block home-chhath-section">
        <div className="home-section-header">
          <div>
            <div className="home-festival-badge">
              <i className="fa-solid fa-sun" /> आस्था का महापर्व &middot; Chhath Mahaparv Special
            </div>
            <h3 className="home-section-title">
              <i className="fa-solid fa-sun" style={{ color: '#f59e0b' }} />{' '}
              Pavitra Chhath Mahaparv Geetein
            </h3>
            <p className="home-section-subtitle">
              Sacred Ganga-ghat hymns and traditional offerings by Sharda Sinha, Anuradha Paudwal, Pawan Singh &amp; legends
            </p>
          </div>
          <div className="home-section-actions">
            <button
              type="button"
              className="home-play-all-pill"
              onClick={() => {
                if (allChhathSongs.length > 0) {
                  handlePlayAll(allChhathSongs, 'Chhath Mahaparv');
                }
              }}
              title="Play All Chhath Songs"
            >
              <i className="fa-solid fa-play" /> Play All
            </button>
            <button
              type="button"
              className="home-play-all-pill home-shuffle-pill"
              onClick={() => {
                if (allChhathSongs.length > 0) {
                  handleShuffleAll(allChhathSongs, 'Chhath Mahaparv');
                }
              }}
              title="Shuffle Chhath Songs"
            >
              <i className="fa-solid fa-shuffle" /> Shuffle
            </button>
            <Link href="/playlists/chhath_geet" className="home-see-all-btn">
              All Chhath Songs ({allChhathSongs.length}) <i className="fa-solid fa-chevron-right" />
            </Link>
          </div>
        </div>

        <SongGrid
          songs={homeChhathSongs}
          visibleCount={6}
          viewMode="bars"
          genres={BHOJPURI_GENRES}
          currentSong={currentSong}
          isPlaying={isPlaying}
          favorites={favorites}
          onPlaySong={(song) => {
            if (currentSong && currentSong.id === song.id) togglePlayPause();
            else playSong(song, true, allChhathSongs, 'Chhath Mahaparv');
          }}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      {/* Featured Curated Playlists */}
      <div className="home-section-block">
        <div className="home-section-header">
          <div>
            <h3 className="home-section-title">
              <i className="fa-solid fa-list-check" style={{ color: 'var(--accent-primary)' }} />{' '}
              Curated Playlists
            </h3>
          </div>
          <Link href="/playlists" className="home-see-all-btn">
            All Playlists ({CURATED_PLAYLISTS.length}) <i className="fa-solid fa-chevron-right" />
          </Link>
        </div>

        <div className="playlist-grid home-playlist-grid">
          {homeFeaturedPlaylists.map((pl) => {
            const plSongs = getSongsForCategory(BHOJPURI_SONGS, pl.id);
            return (
              <Link
                key={pl.id}
                href={`/playlists/${pl.id}`}
                className="playlist-card"
                style={{ '--pl-gradient': pl.gradient, '--pl-accent': pl.accent }}
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
                      if (plSongs.length > 0) playSong(plSongs[0], true, plSongs, pl.name);
                    }}
                  >
                    <i className="fa-solid fa-play" />
                  </button>
                </div>
                <div className="playlist-card-body">
                  <h4 className="playlist-card-title">{pl.name}</h4>
                  <div className="playlist-hindi-title">{pl.hindiTitle}</div>
                  <p className="playlist-card-desc">{pl.description}</p>
                  <div className="playlist-card-footer">
                    <span className="playlist-track-count">
                      <i className="fa-solid fa-music" /> {plSongs.length} Tracks
                    </span>
                    <span className="playlist-enter-pill">
                      Explore <i className="fa-solid fa-arrow-right" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Trending Song Bars Preview */}
      <div className="home-section-block">
        <div className="home-section-header">
          <div>
            <h3 className="home-section-title">
              <i className="fa-solid fa-fire" style={{ color: 'var(--accent-primary)' }} />{' '}
              Trending Songs Today
            </h3>
            <p className="home-section-subtitle">Top viral anthems and audience favorites</p>
          </div>
          <Link href="/songs" className="home-see-all-btn">
            View All Songs ({BHOJPURI_SONGS.length}) <i className="fa-solid fa-chevron-right" />
          </Link>
        </div>

        <SongGrid
          songs={homeTrendingSongs}
          visibleCount={6}
          viewMode="bars"
          genres={BHOJPURI_GENRES}
          currentSong={currentSong}
          isPlaying={isPlaying}
          favorites={favorites}
          onPlaySong={(song) => {
            if (currentSong && currentSong.id === song.id) togglePlayPause();
            else playSong(song, true, homeTrendingSongs, 'Trending Today');
          }}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      {/* Top Bhojpuri Singers Preview */}
      <div className="home-section-block">
        <div className="home-section-header">
          <div>
            <h3 className="home-section-title">
              <i className="fa-solid fa-microphone-lines" style={{ color: 'var(--accent-gold)' }} />{' '}
              Iconic Bhojpuri Voices
            </h3>
          </div>
          <Link href="/singers" className="home-see-all-btn">
            View All Singers <i className="fa-solid fa-chevron-right" />
          </Link>
        </div>

        <div className="artists-scroll-wrap">
          {BHOJPURI_ARTISTS.slice(0, 6).map((artist) => (
            <Link
              key={artist.name}
              href={`/singers/${encodeURIComponent(artist.name)}`}
              className="artist-card"
            >
              <div className="artist-avatar-wrap">
                <div className="artist-avatar">
                  <span>{artist.name[0]}</span>
                </div>
                <span className="artist-play-indicator">
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </div>
              <div className="artist-name">{artist.name}</div>
              <div className="artist-badge-pill">{artist.badge}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
