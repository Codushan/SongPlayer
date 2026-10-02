'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BHOJPURI_SONGS, BHOJPURI_GENRES, BHOJPURI_ARTISTS } from '@/data/songs';
import { songMatchesCategory } from '@/data/playlists';
import { useAudio } from '@/components/AudioContext';
import SongGrid from '@/components/SongGrid';

export default function SingerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug ? decodeURIComponent(params.slug) : '';

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

  const [activeArtistGenre, setActiveArtistGenre] = useState('all');

  // Match artist name
  const artist = useMemo(() => {
    if (!rawSlug) return null;
    const lower = rawSlug.toLowerCase().replace(/-/g, ' ');
    return (
      BHOJPURI_ARTISTS.find(
        (a) =>
          a.name.toLowerCase() === lower ||
          a.name.toLowerCase() === rawSlug.toLowerCase() ||
          a.name.toLowerCase().includes(lower)
      ) || { name: rawSlug, hindiName: '', badge: 'Bhojpuri Singer' }
    );
  }, [rawSlug]);

  const artistName = artist?.name || rawSlug;

  const artistBaseSongs = useMemo(() => {
    if (!artistName) return [];
    const artLower = artistName.toLowerCase();
    return BHOJPURI_SONGS.filter(
      (s) =>
        (s.singer && s.singer.toLowerCase().includes(artLower)) ||
        (s.starring && s.starring.toLowerCase().includes(artLower))
    );
  }, [artistName]);

  const filteredSongs = useMemo(() => {
    let list = [...artistBaseSongs];
    if (activeArtistGenre && activeArtistGenre !== 'all') {
      list = list.filter((s) => songMatchesCategory(s, activeArtistGenre));
    }
    return list;
  }, [artistBaseSongs, activeArtistGenre]);

  return (
    <section className="view-content-pane">
      <SongGrid
        songs={filteredSongs}
        visibleCount={100}
        viewMode="bars"
        genres={BHOJPURI_GENRES}
        currentSong={currentSong}
        isPlaying={isPlaying}
        favorites={favorites}
        onPlaySong={(song) => {
          if (currentSong && currentSong.id === song.id) togglePlayPause();
          else playSong(song, true, filteredSongs, artistName);
        }}
        onToggleFavorite={toggleFavorite}
        activeArtist={artistName}
        onBack={() => router.push('/singers')}
        backLabel="Back to Singers"
        onPlayAll={handlePlayAll}
        onShuffleAll={handleShuffleAll}
        activeArtistGenre={activeArtistGenre}
        onSelectArtistGenre={setActiveArtistGenre}
        artistBaseSongs={artistBaseSongs}
      />
    </section>
  );
}
