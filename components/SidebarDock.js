'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './SidebarDock.css';

export default function SidebarDock({
  activeNav,
  onSelectNav,
  favoritesCount = 0,
}) {
  const pathname = usePathname() || '/';

  const navItems = useMemo(
    () => [
      { id: 'home', href: '/', label: 'Discover', icon: 'fa-solid fa-compass' },
      { id: 'songs', href: '/songs', label: 'All Songs', icon: 'fa-solid fa-music' },
      { id: 'playlists', href: '/playlists', label: 'Playlists', icon: 'fa-solid fa-list-check' },
      { id: 'artists', href: '/singers', label: 'Singers', icon: 'fa-solid fa-microphone-lines' },
      { id: 'albums', href: '/albums', label: 'Albums', icon: 'fa-solid fa-compact-disc' },
      { id: 'genres', href: '/genres', label: 'Genres', icon: 'fa-solid fa-layer-group' },
      { id: 'favorites', href: '/favorites', label: 'Favorites', icon: 'fa-solid fa-heart', badge: favoritesCount },
    ],
    [favoritesCount]
  );

  const activeIndex = useMemo(() => {
    if (activeNav) {
      const idx = navItems.findIndex((item) => item.id === activeNav);
      if (idx !== -1) return idx;
    }
    const idx = navItems.findIndex((item) =>
      item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
    );
    return idx !== -1 ? idx : 0;
  }, [activeNav, pathname, navItems]);

  const navRef = useRef(null);
  const itemRefs = useRef([]);
  const [isMounted, setIsMounted] = useState(false);
  const [bubblePos, setBubblePos] = useState({
    x: 0,
    y: 0,
    width: 48,
    height: 48,
    ready: false,
  });

  const updateBubble = useCallback(() => {
    const navEl = navRef.current;
    const el = itemRefs.current[activeIndex];
    if (navEl && el && el.offsetWidth > 0 && el.offsetHeight > 0) {
      const navRect = navEl.getBoundingClientRect();
      const itemRect = el.getBoundingClientRect();
      const diameter = 48;
      const clientLeft = navEl.clientLeft || 0;
      const clientTop = navEl.clientTop || 0;
      const centerX = itemRect.left + itemRect.width / 2 - (navRect.left + clientLeft);
      const centerY = itemRect.top + itemRect.height / 2 - (navRect.top + clientTop);
      const x = Math.round(centerX - diameter / 2);
      const y = Math.round(centerY - diameter / 2);

      setBubblePos({
        x,
        y,
        width: diameter,
        height: diameter,
        ready: true,
      });
      return true;
    } else {
      setBubblePos((prev) => (prev.ready ? { ...prev, ready: false } : prev));
      return false;
    }
  }, [activeIndex]);

  useEffect(() => {
    // Initial measurement
    updateBubble();

    // Schedule frame update once DOM layout paints
    const rafId = requestAnimationFrame(() => {
      updateBubble();
      setIsMounted(true);
    });

    // Safety checks for webfont loading and responsive viewport reflow
    const t1 = setTimeout(updateBubble, 60);
    const t2 = setTimeout(updateBubble, 180);
    const t3 = setTimeout(updateBubble, 350);

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => updateBubble()).catch(() => {});
    }

    // Auto-update if dock size changes (e.g. orientation or window resize)
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && navRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateBubble();
      });
      resizeObserver.observe(navRef.current);
    }

    window.addEventListener('resize', updateBubble);
    window.addEventListener('orientationchange', updateBubble);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateBubble);
      window.removeEventListener('orientationchange', updateBubble);
    };
  }, [updateBubble]);

  return (
    <aside className="vision-dock-container" aria-label="Main Navigation">
      <nav className="vision-dock" ref={navRef}>
        {/* Dynamic flowing liquid bubble indicator */}
        <div
          className={`dock-bubble-indicator${isMounted ? '' : ' no-transition'}`}
          style={{
            transform: `translate3d(${bubblePos.x}px, ${bubblePos.y}px, 0)`,
            width: `${bubblePos.width}px`,
            height: `${bubblePos.height}px`,
            borderRadius: '50%',
            opacity: bubblePos.ready ? 1 : 0,
          }}
          aria-hidden="true"
        >
          <div className="bubble-glint" />
          <div className="bubble-shimmer" />
        </div>

        {navItems.map((item, idx) => {
          const isActive = activeIndex === idx;

          return (
            <Link
              key={item.id}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              href={item.href}
              className={`vision-dock-item vision-dock-item-${item.id}${isActive ? ' active' : ''}`}
              data-nav-id={item.id}
              onClick={() => {
                if (onSelectNav) onSelectNav(item.id);
              }}
              title={item.label}
              aria-label={item.label}
            >
              <i className={item.icon} />
              <span className="dock-tooltip">{item.label}</span>
              {item.badge > 0 && <span className="dock-badge">{item.badge}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
