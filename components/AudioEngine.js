'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

/**
 * Pure AudioEngine using YouTube IFrame Player API.
 * Streams genuine audio cleanly without synthetic fallback beeps/tones.
 */
const AudioEngine = forwardRef(function AudioEngine(
  { onReady, onTimeUpdate, onEnded, onError, onStateChange },
  ref
) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const apiReadyRef = useRef(false);
  const pendingVideoIdRef = useRef(null);
  const pollRef = useRef(null);
  const expectedPlayingRef = useRef(false);

  const callbacksRef = useRef({ onReady, onTimeUpdate, onEnded, onError, onStateChange });
  useEffect(() => {
    callbacksRef.current = { onReady, onTimeUpdate, onEnded, onError, onStateChange };
  });

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      apiReadyRef.current = true;
      createPlayer();
      return;
    }

    const existingScript = document.getElementById('youtube-iframe-api');
    if (!existingScript) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
    }

    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevCallback === 'function') prevCallback();
      apiReadyRef.current = true;
      createPlayer();
    };

    return () => {
      stopPolling();
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          /* no-op */
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When user unlocks mobile screen or returns to tab, auto-resume real song if playing was expected
  useEffect(() => {
    const handleVis = () => {
      if (!document.hidden && expectedPlayingRef.current) {
        if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
          try {
            playerRef.current.playVideo();
          } catch (e) {}
        }
      }
    };
    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
  }, []);

  function createPlayer() {
    if (!containerRef.current || playerRef.current) return;

    playerRef.current = new window.YT.Player(containerRef.current, {
      height: '200',
      width: '200',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          if (pendingVideoIdRef.current) {
            const { videoId, autoPlay } = pendingVideoIdRef.current;
            loadVideo(videoId, autoPlay);
            pendingVideoIdRef.current = null;
          }
        },
        onStateChange: (e) => {
          const YT = window.YT;
          if (!YT) return;
          const cb = callbacksRef.current;

          const checkDuration = () => {
            if (playerRef.current && typeof playerRef.current.getDuration === 'function') {
              const d = playerRef.current.getDuration();
              if (d && d > 0 && cb.onReady) {
                cb.onReady(d);
              }
            }
          };

          if (e.data === YT.PlayerState.PLAYING) {
            expectedPlayingRef.current = true;
            startPolling();
            checkDuration();
            if (cb.onStateChange) cb.onStateChange('playing');
          } else if (e.data === YT.PlayerState.PAUSED) {
            stopPolling();
            checkDuration();
            if (cb.onStateChange) cb.onStateChange('paused');
          } else if (e.data === YT.PlayerState.ENDED) {
            stopPolling();
            if (cb.onEnded) cb.onEnded();
          } else if (e.data === YT.PlayerState.BUFFERING) {
            checkDuration();
            if (cb.onStateChange) cb.onStateChange('buffering');
          } else if (e.data === YT.PlayerState.CUED) {
            checkDuration();
          }
        },
        onError: (e) => {
          console.warn('[AudioEngine] YouTube playback error (Code ' + e.data + ')');
          if (callbacksRef.current.onError) {
            callbacksRef.current.onError(e);
          }
        },
      },
    });
  }

  // --- YouTube Polling ---
  function startPolling() {
    stopPolling();
    pollRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const t = playerRef.current.getCurrentTime();
        if (callbacksRef.current.onTimeUpdate) callbacksRef.current.onTimeUpdate(t);
        if (typeof playerRef.current.getDuration === 'function') {
          const d = playerRef.current.getDuration();
          if (d && d > 0 && callbacksRef.current.onReady) {
            callbacksRef.current.onReady(d);
          }
        }
      }
    }, 500);
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  function loadVideo(videoId, autoPlay) {
    if (!videoId) return;

    if (!playerRef.current || !apiReadyRef.current || !playerRef.current.loadVideoById) {
      pendingVideoIdRef.current = { videoId, autoPlay };
      return;
    }

    try {
      if (autoPlay) {
        expectedPlayingRef.current = true;
        playerRef.current.loadVideoById(videoId, 0);
        playerRef.current.playVideo();
      } else {
        expectedPlayingRef.current = false;
        playerRef.current.cueVideoById(videoId, 0);
      }
    } catch (e) {
      console.warn('[AudioEngine] Direct load failed:', e);
    }
  }

  useImperativeHandle(ref, () => ({
    load(videoId, autoPlay = true) {
      loadVideo(videoId, autoPlay);
    },
    play() {
      expectedPlayingRef.current = true;
      if (playerRef.current && playerRef.current.playVideo) {
        try {
          playerRef.current.playVideo();
        } catch (e) {
          console.warn('[AudioEngine] Play failed:', e);
        }
      }
    },
    pause() {
      expectedPlayingRef.current = false;
      if (playerRef.current && playerRef.current.pauseVideo) {
        playerRef.current.pauseVideo();
      }
    },
    seekTo(seconds) {
      if (playerRef.current && playerRef.current.seekTo) {
        playerRef.current.seekTo(seconds, true);
      }
    },
    setVolume(vol) {
      if (playerRef.current && playerRef.current.setVolume) {
        playerRef.current.setVolume(vol);
      }
    },
    getDuration() {
      return playerRef.current && playerRef.current.getDuration
        ? playerRef.current.getDuration()
        : 240;
    },
  }));

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: '200px',
        height: '200px',
        bottom: 0,
        right: 0,
        opacity: 0.001,
        pointerEvents: 'none',
        zIndex: -9999,
        transform: 'scale(0.01)',
        transformOrigin: 'bottom right',
      }}
    >
      <div ref={containerRef} />
    </div>
  );
});

export default AudioEngine;
