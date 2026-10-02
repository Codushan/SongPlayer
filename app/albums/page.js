'use client';

import { useState } from 'react';
import './page.css';
import { BHOJPURI_SONGS, BHOJPURI_GENRES } from '@/data/songs';
import { useAudio } from '@/components/AudioContext';
import AlbumSection from '@/components/AlbumSection';
import SongGrid from '@/components/SongGrid';

export default function AlbumsPage() {
  const { currentSong, isPlaying, playSong, togglePlayPause, favorites, toggleFavorite, handlePlayAll, handleShuffleAll } = useAudio();
  const [activeAlbum, setActiveAlbum] = useState(null);

  const albumSongs = activeAlbum
    ? BHOJPURI_SONGS.filter((s) => s.album && s.album.toLowerCase() === activeAlbum.toLowerCase())
    : [];

  return (
    <section className="view-content-pane">
      {activeAlbum ? (
        <SongGrid
          songs={albumSongs}
          visibleCount={100}
          viewMode="bars"
          genres={BHOJPURI_GENRES}
          currentSong={currentSong}
          isPlaying={isPlaying}
          favorites={favorites}
          onPlaySong={(song) => {
            if (currentSong && currentSong.id === song.id) togglePlayPause();
            else playSong(song, true, albumSongs, activeAlbum);
          }}
          onToggleFavorite={toggleFavorite}
          activeAlbum={activeAlbum}
          onBack={() => setActiveAlbum(null)}
          backLabel="Back to Albums"
          onPlayAll={(list) => handlePlayAll(list || albumSongs, activeAlbum)}
          onShuffleAll={(list) => handleShuffleAll(list || albumSongs, activeAlbum)}
        />
      ) : (
        <AlbumSection
          songs={BHOJPURI_SONGS}
          activeAlbum={activeAlbum}
          onSelectAlbum={setActiveAlbum}
          onClearAlbum={() => setActiveAlbum(null)}
          onPlayAlbum={(firstSong, albumName, songsInAlbum) =>
            firstSong && playSong(firstSong, true, songsInAlbum || [firstSong], albumName || activeAlbum)
          }
        />
      )}
    </section>
  );
}
