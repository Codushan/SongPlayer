'use client';

import { useState, useMemo } from 'react';
import { BHOJPURI_SONGS, BHOJPURI_GENRES } from '@/data/songs';
import { songMatchesCategory } from '@/data/playlists';
import { useAudio } from '@/components/AudioContext';
import { GenreCards } from '@/components/GenreSection';
import SongGrid from '@/components/SongGrid';

export default function GenresPage() {
  const { currentSong, isPlaying, playSong, togglePlayPause, favorites, toggleFavorite, handlePlayAll, handleShuffleAll } = useAudio();
  const [activeGenre, setActiveGenre] = useState(null);

  const songCounts = useMemo(() => {
    const counts = {};
    BHOJPURI_SONGS.forEach((s) => {
      counts[s.genreId] = (counts[s.genreId] || 0) + 1;
    });
    return counts;
  }, []);

  const genreObj = useMemo(() => {
    if (!activeGenre) return null;
    return BHOJPURI_GENRES.find((g) => g.id === activeGenre) || null;
  }, [activeGenre]);

  const genreSongs = useMemo(() => {
    if (!activeGenre) return [];
    return BHOJPURI_SONGS.filter((s) => s.genreId === activeGenre || songMatchesCategory(s, activeGenre));
  }, [activeGenre]);

  return (
    <section className="view-content-pane">
      {activeGenre && genreObj ? (
        <SongGrid
          songs={genreSongs}
          visibleCount={100}
          viewMode="bars"
          genres={BHOJPURI_GENRES}
          currentSong={currentSong}
          isPlaying={isPlaying}
          favorites={favorites}
          onPlaySong={(song) => {
            if (currentSong && currentSong.id === song.id) togglePlayPause();
            else playSong(song);
          }}
          onToggleFavorite={toggleFavorite}
          activeGenreObj={genreObj}
          onBack={() => setActiveGenre(null)}
          backLabel="Back to Genres"
          onPlayAll={handlePlayAll}
          onShuffleAll={handleShuffleAll}
        />
      ) : (
        <GenreCards
          genres={BHOJPURI_GENRES}
          songCounts={songCounts}
          activeGenre={activeGenre}
          onSelectGenre={setActiveGenre}
        />
      )}
    </section>
  );
}
