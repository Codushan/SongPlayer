'use client';

import { createContext, useContext, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { BHOJPURI_SONGS, BHOJPURI_GENRES } from '@/data/songs';
import AudioEngine from '@/components/AudioEngine';
import BottomPlayer from '@/components/BottomPlayer';
import Toast from '@/components/Toast';

const FAVORITES_KEY = 'bhojpuri_sur_favorites';
const DURATION_CACHE_KEY = 'bhojpuri_sur_durations';

function parseDurationToSeconds(duration) {
  const parts = (duration || '').split(':');
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }
  return 225;
}

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const engineRef = useRef(null);

  // Playback State
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [volume, setVolumeState] = useState(85);
  const [prevVolume, setPrevVolume] = useState(85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [favorites, setFavorites] = useState(() => new Set());
  const [queue, setQueue] = useState(BHOJPURI_SONGS);
  const [queueTitle, setQueueTitle] = useState('Bhojpuri Hits');
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

  // Global Toast State
  const [toast, setToast] = useState({ message: '', show: false });
  const toastTimerRef = useRef(null);

  const showToast = useCallback((message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, show: true });
    toastTimerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 2500);
  }, []);

  // Load Favorites from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) setFavorites(new Set(JSON.parse(saved)));
    } catch (e) {
      console.warn('Could not load favorites', e);
    }
  }, []);

  // Duration Cache (song.youtubeId || song.id -> seconds)
  const durationCacheRef = useRef({});
  const currentSongRef = useRef(currentSong);

  useEffect(() => {
    currentSongRef.current = currentSong;
  }, [currentSong]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DURATION_CACHE_KEY);
      if (saved) durationCacheRef.current = JSON.parse(saved);
    } catch (e) {
      console.warn('Could not load duration cache', e);
    }
  }, []);

  const saveDurationToCache = useCallback((songKey, dur) => {
    if (!songKey || !dur || dur <= 0) return;
    const rounded = Math.round(dur);
    if (durationCacheRef.current[songKey] === rounded) return;
    durationCacheRef.current[songKey] = rounded;
    try {
      localStorage.setItem(DURATION_CACHE_KEY, JSON.stringify(durationCacheRef.current));
    } catch (e) {
      /* ignore quota errors */
    }
  }, []);

  const persistFavorites = useCallback((set) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(set)));
    } catch (e) {
      console.warn('Could not save favorites', e);
    }
  }, []);

  const toggleFavorite = useCallback(
    (songId) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        const song = BHOJPURI_SONGS.find((s) => s.id === songId);
        const title = song ? song.title : 'Song';
        if (next.has(songId)) {
          next.delete(songId);
          showToast(`❌ Removed "${title}" from Favorites`);
        } else {
          next.add(songId);
          showToast(`💖 Added "${title}" to Favorites!`);
        }
        persistFavorites(next);
        return next;
      });
    },
    [persistFavorites, showToast]
  );

  // Play a song with optional custom playlist queue and title
  const playSong = useCallback(
    (song, autoPlay = true, newQueue = null, newQueueTitle = null) => {
      if (!song) return;
      if (newQueue && Array.isArray(newQueue) && newQueue.length > 0) {
        setQueue(newQueue);
      }
      if (newQueueTitle) {
        setQueueTitle(newQueueTitle);
      }
      setCurrentSong(song);
      currentSongRef.current = song;
      setCurrentTime(0);
      const songKey = song.youtubeId || song.id;
      setDuration(parseDurationToSeconds(song.duration));
      setIsPlaying(autoPlay);
      if (engineRef.current) {
        engineRef.current.load(song.youtubeId, autoPlay);
      }
      if (autoPlay) {
        showToast(`🎶 Playing: "${song.title}"`);
      }
    },
    [showToast]
  );

  // Cue first song on mount
  useEffect(() => {
    if (BHOJPURI_SONGS.length > 0 && !currentSong) {
      playSong(BHOJPURI_SONGS[0], false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume with engine
  const setVolume = useCallback((val) => {
    setVolumeState(val);
    if (engineRef.current) engineRef.current.setVolume(val);
  }, []);

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume || 80);
    }
  }, [volume, prevVolume, setVolume]);

  const togglePlayPause = useCallback(() => {
    if (!currentSong) {
      if (BHOJPURI_SONGS.length > 0) playSong(BHOJPURI_SONGS[0]);
      return;
    }
    setIsPlaying((prev) => {
      const next = !prev;
      if (engineRef.current) {
        if (next) engineRef.current.play();
        else engineRef.current.pause();
      }
      return next;
    });
  }, [currentSong, playSong]);

  const playNext = useCallback(() => {
    const q = queue.length > 0 ? queue : BHOJPURI_SONGS;
    if (q.length === 0) return;
    if (isShuffle) {
      const randIdx = Math.floor(Math.random() * q.length);
      playSong(q[randIdx]);
    } else {
      const idx = currentSong ? q.findIndex((s) => s.id === currentSong.id) : -1;
      const nextIdx = (idx + 1 + q.length) % q.length;
      playSong(q[nextIdx]);
    }
  }, [queue, isShuffle, currentSong, playSong]);

  const playPrev = useCallback(() => {
    const q = queue.length > 0 ? queue : BHOJPURI_SONGS;
    if (q.length === 0) return;
    if (currentTime > 4) {
      if (engineRef.current) engineRef.current.seekTo(0);
      setCurrentTime(0);
      return;
    }
    const idx = currentSong ? q.findIndex((s) => s.id === currentSong.id) : -1;
    const prevIdx = (idx - 1 + q.length) % q.length;
    playSong(q[prevIdx]);
  }, [queue, currentTime, currentSong, playSong]);

  const handleSongEnd = useCallback(() => {
    if (isRepeat && currentSong) {
      if (engineRef.current) {
        engineRef.current.seekTo(0);
        engineRef.current.play();
      }
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      playNext();
    }
  }, [isRepeat, currentSong, playNext]);

  const seekTo = useCallback(
    (seconds) => {
      const clamped = Math.max(0, Math.min(seconds, duration));
      setCurrentTime(clamped);
      if (engineRef.current) engineRef.current.seekTo(clamped);
    },
    [duration]
  );

  const handleShuffleAll = useCallback(
    (tracksToShuffle, customTitle = null) => {
      const source = tracksToShuffle && tracksToShuffle.length > 0 ? tracksToShuffle : BHOJPURI_SONGS;
      setQueue(source);
      if (customTitle) setQueueTitle(customTitle);
      setIsShuffle(true);
      const randIdx = Math.floor(Math.random() * source.length);
      playSong(source[randIdx]);
      showToast('🎲 Bhojpuri Radio Live!');
    },
    [playSong, showToast]
  );

  const handlePlayAll = useCallback(
    (trackList, customTitle = null) => {
      if (trackList && trackList.length > 0) {
        setQueue(trackList);
        if (customTitle) setQueueTitle(customTitle);
        playSong(trackList[0]);
      }
    },
    [playSong]
  );

  const currentGenreObj = useMemo(() => {
    if (!currentSong) return null;
    return (
      BHOJPURI_GENRES.find((g) => g.id === currentSong.genreId) || {
        icon: '🎵',
        gradient: 'linear-gradient(135deg, #ff007a, #7928ca)',
      }
    );
  }, [currentSong]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (e.shiftKey) playNext();
        else seekTo(currentTime + 5);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (e.shiftKey) playPrev();
        else seekTo(currentTime - 5);
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'l' || e.key === 'L') {
        if (currentSong) toggleFavorite(currentSong.id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [togglePlayPause, playNext, playPrev, seekTo, currentTime, toggleMute, currentSong, toggleFavorite]);

  const value = {
    currentSong,
    isPlaying,
    isShuffle,
    isRepeat,
    volume,
    currentTime,
    duration,
    favorites,
    queue,
    queueTitle,
    setQueueTitle,
    isPlayerExpanded,
    setIsPlayerExpanded,
    currentGenreObj,
    playSong,
    togglePlayPause,
    playNext,
    playPrev,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle: () => setIsShuffle((prev) => !prev),
    toggleRepeat: () => setIsRepeat((prev) => !prev),
    toggleFavorite,
    handleShuffleAll,
    handlePlayAll,
    showToast,
    setQueue,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}

      {/* Persistent Audio Engine */}
      <AudioEngine
        ref={engineRef}
        onTimeUpdate={(t) => setCurrentTime(t)}
        onEnded={handleSongEnd}
        onError={(err) => {
          console.warn('Playback error for song:', currentSong?.title, err);
          showToast(`⚠️ Audio unavailable for "${currentSong?.title || 'this track'}"`);
          setIsPlaying(false);
        }}
      />

      {/* Persistent Bottom Floating Player */}
      <BottomPlayer
        song={currentSong}
        genreObj={currentGenreObj}
        isPlaying={isPlaying}
        isShuffle={isShuffle}
        isRepeat={isRepeat}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isLiked={currentSong ? favorites.has(currentSong.id) : false}
        onTogglePlayPause={togglePlayPause}
        onNext={playNext}
        onPrev={playPrev}
        onToggleShuffle={() => setIsShuffle((v) => !v)}
        onToggleRepeat={() => setIsRepeat((v) => !v)}
        onSeek={seekTo}
        onToggleLike={() => currentSong && toggleFavorite(currentSong.id)}
        onVolumeChange={setVolume}
        onToggleMute={toggleMute}
        queue={queue}
        queueTitle={queueTitle}
        onPlaySong={playSong}
        onToggleFavorite={toggleFavorite}
        favorites={favorites}
        isExpanded={isPlayerExpanded}
        setIsExpanded={setIsPlayerExpanded}
      />

      {/* Toast notifications */}
      <Toast message={toast.message} show={toast.show} />
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return ctx;
}
