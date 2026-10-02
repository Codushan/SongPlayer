'use client';

import { useMemo } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';
import { BHOJPURI_SONGS, BHOJPURI_GENRES } from '@/data/songs';
import { useAudio } from '@/components/AudioContext';
import SongGrid from '@/components/SongGrid';

export default function FavoritesPage() {
  const router = useRouter();
  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlayPause,
    favorites,
    toggleFavorite,
    handlePlayAll,
    handleShuffleAll,
  } = useAudio();

  const favoriteSongs = useMemo(() => {
    return BHOJPURI_SONGS.filter((s) => favorites.has(s.id));
  }, [favorites]);

  return (
    <section className="view-content-pane">
      <SongGrid
        songs={favoriteSongs}
        visibleCount={100}
        viewMode="bars"
        genres={BHOJPURI_GENRES}
        currentSong={currentSong}
        isPlaying={isPlaying}
        favorites={favorites}
        onPlaySong={(song) => {
          if (currentSong && currentSong.id === song.id) togglePlayPause();
          else playSong(song, true, favoriteSongs, 'Liked Songs');
        }}
        onToggleFavorite={toggleFavorite}
        title={`💖 Liked Songs (${favorites.size})`}
        subtitle="Your personal collection of favorite Bhojpuri tracks"
        onPlayAll={handlePlayAll}
        onShuffleAll={handleShuffleAll}
        onResetFilters={() => router.push('/songs')}
      />
    </section>
  );
}
