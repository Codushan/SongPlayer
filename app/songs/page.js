'use client';

import { useState, useMemo, Suspense } from 'react';
import './page.css';
import { useSearchParams } from 'next/navigation';
import { BHOJPURI_SONGS, BHOJPURI_GENRES } from '@/data/songs';
import { useAudio } from '@/components/AudioContext';
import FilterToolbar from '@/components/FilterToolbar';
import SongGrid from '@/components/SongGrid';

const PAGE_SIZE = 40;

function AllSongsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';

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

  const [activeEra, setActiveEra] = useState('all');
  const [quickFilter, setQuickFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('bars');
  const [page, setPage] = useState(1);

  const filteredSongs = useMemo(() => {
    let list = [...BHOJPURI_SONGS];

    // Era Filter
    if (activeEra !== 'all') {
      if (activeEra === '2020s') list = list.filter((s) => s.year >= 2020);
      else if (activeEra === '2010s') list = list.filter((s) => s.year >= 2010 && s.year <= 2019);
      else if (activeEra === '2000s') list = list.filter((s) => s.year >= 2000 && s.year <= 2009);
      else if (activeEra === '90s') list = list.filter((s) => s.year >= 1990 && s.year <= 1999);
      else if (activeEra === 'classic') list = list.filter((s) => s.year < 1990);
    }

    // Quick Filter Tabs
    if (quickFilter === 'popular') {
      list = list.filter(
        (s) =>
          s.genreId === 'dj_party' ||
          s.genreId === 'romantic' ||
          (s.title || '').toLowerCase().includes('lollypop') ||
          (s.title || '').toLowerCase().includes('pudina') ||
          (s.title || '').toLowerCase().includes('raja') ||
          (s.title || '').toLowerCase().includes('kamariya')
      );
    } else if (quickFilter === 'chartbusters') {
      list = list.filter(
        (s) =>
          s.year >= 2015 ||
          (s.singer || '').includes('Pawan Singh') ||
          (s.singer || '').includes('Khesari Lal') ||
          (s.singer || '').includes('Shilpi Raj')
      );
    } else if (quickFilter === 'recent') {
      list = list.filter((s) => s.year >= 2020);
    } else if (quickFilter === 'classics') {
      list = list.filter((s) => s.year < 2005 || s.genreId === 'classics' || s.genreId === 'lokgeet');
    }

    // Search Query from URL
    if (initialQuery.trim()) {
      const q = initialQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          (s.title && s.title.toLowerCase().includes(q)) ||
          (s.singer && s.singer.toLowerCase().includes(q)) ||
          (s.genreName && s.genreName.toLowerCase().includes(q)) ||
          (s.album && s.album.toLowerCase().includes(q)) ||
          (s.genre && s.genre.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'year-desc') list.sort((a, b) => b.year - a.year);
    else if (sortBy === 'year-asc') list.sort((a, b) => a.year - b.year);
    else if (sortBy === 'title-asc') list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    else if (sortBy === 'singer-asc') list.sort((a, b) => (a.singer || '').localeCompare(b.singer || ''));

    return list;
  }, [activeEra, quickFilter, initialQuery, sortBy]);

  const visibleCount = page * PAGE_SIZE;

  return (
    <section className="view-content-pane">
      <FilterToolbar
        activeEra={activeEra}
        onSelectEra={setActiveEra}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        songsCount={filteredSongs.length}
        showOnlyFavorites={false}
      />

      <SongGrid
        songs={filteredSongs}
        visibleCount={visibleCount}
        viewMode={viewMode}
        genres={BHOJPURI_GENRES}
        currentSong={currentSong}
        isPlaying={isPlaying}
        favorites={favorites}
        onPlaySong={(song) => {
          if (currentSong && currentSong.id === song.id) togglePlayPause();
          else playSong(song, true, filteredSongs, 'All Songs');
        }}
        onToggleFavorite={toggleFavorite}
        onLoadMore={() => setPage((p) => p + 1)}
        onResetFilters={() => {
          setActiveEra('all');
          setQuickFilter('all');
          setSortBy('default');
        }}
        quickFilter={quickFilter}
        onSelectQuickFilter={setQuickFilter}
        onPlayAll={handlePlayAll}
        onShuffleAll={handleShuffleAll}
      />
    </section>
  );
}

export default function AllSongsPage() {
  return (
    <Suspense fallback={<section className="view-content-pane"><div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>Loading songs...</div></section>}>
      <AllSongsContent />
    </Suspense>
  );
}
