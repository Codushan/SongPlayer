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
  const { currentSong, isPlaying, playSong, togglePlayPause, favorites, toggleFavorite, handleShuffleAll } = useAudio();

  const homeTrendingSongs = useMemo(() => {
    return BHOJPURI_SONGS.slice(0, 6);
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

      {/* Featured Curated Playlists (First 4 by default on Home) */}
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
          {CURATED_PLAYLISTS.slice(0, 4).map((pl) => {
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
