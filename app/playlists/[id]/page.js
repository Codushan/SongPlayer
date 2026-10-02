'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BHOJPURI_SONGS, BHOJPURI_GENRES } from '@/data/songs';
import {
  CURATED_PLAYLISTS,
  songMatchesCategory,
  CENTURY_ERAS,
  filterSongsByEra,
} from '@/data/playlists';
import { useAudio } from '@/components/AudioContext';
import SongGrid from '@/components/SongGrid';

export default function PlaylistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const playlistId = params?.id;

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

  const [playlistSort, setPlaylistSort] = useState('best'); // 'best' | 'pop' | 'year-desc' | 'year-asc'
  const [playlistEra, setPlaylistEra] = useState('all');

  const playlist = useMemo(() => {
    return CURATED_PLAYLISTS.find((p) => p.id === playlistId) || null;
  }, [playlistId]);

  const playlistBaseSongs = useMemo(() => {
    if (!playlistId) return [];
    return BHOJPURI_SONGS.filter((s) => songMatchesCategory(s, playlistId));
  }, [playlistId]);

  const filteredSongs = useMemo(() => {
    let list = [...playlistBaseSongs];

    // Century / Era Filter
    if (playlistEra && playlistEra !== 'all') {
      list = filterSongsByEra(list, playlistEra);
    }

    // Pop & Best Sorting
    if (playlistSort === 'best') {
      list.sort((a, b) => {
        const scoreA =
          (a.year >= 2015 ? 50 : 20) +
          (a.singer?.includes('Pawan') || a.singer?.includes('Khesari') || a.singer?.includes('Sharda') ? 50 : 10);
        const scoreB =
          (b.year >= 2015 ? 50 : 20) +
          (b.singer?.includes('Pawan') || b.singer?.includes('Khesari') || b.singer?.includes('Sharda') ? 50 : 10);
        return scoreB - scoreA;
      });
    } else if (playlistSort === 'pop') {
      list.sort((a, b) => {
        const popA =
          (a.genre || '').includes('pop') || (a.genre || '').includes('dj') || (a.rawGenre || '').toLowerCase().includes('party')
            ? 1
            : 0;
        const popB =
          (b.genre || '').includes('pop') || (b.genre || '').includes('dj') || (b.rawGenre || '').toLowerCase().includes('party')
            ? 1
            : 0;
        if (popA !== popB) return popB - popA;
        return b.year - a.year;
      });
    } else if (playlistSort === 'year-desc') {
      list.sort((a, b) => b.year - a.year);
    } else if (playlistSort === 'year-asc') {
      list.sort((a, b) => a.year - b.year);
    }

    return list;
  }, [playlistBaseSongs, playlistEra, playlistSort]);

  if (!playlist) {
    return (
      <div className="empty-state" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="empty-state-icon">📻</div>
        <h2>Playlist Not Found</h2>
        <p>The requested curated playlist could not be found.</p>
        <button
          className="btn-primary"
          style={{ marginTop: '16px' }}
          onClick={() => router.push('/playlists')}
        >
          View All Playlists
        </button>
      </div>
    );
  }

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
          else playSong(song, true, filteredSongs, playlist?.name || playlist?.title);
        }}
        onToggleFavorite={toggleFavorite}
        activePlaylist={playlist}
        onBack={() => router.push('/playlists')}
        backLabel="Back to Playlists"
        onPlayAll={handlePlayAll}
        onShuffleAll={handleShuffleAll}
        playlistSort={playlistSort}
        onSelectPlaylistSort={setPlaylistSort}
        playlistEra={playlistEra}
        onSelectPlaylistEra={setPlaylistEra}
        playlistBaseSongs={playlistBaseSongs}
      />
    </section>
  );
}
