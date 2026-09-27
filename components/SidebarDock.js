'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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

  const itemRefs = useRef([]);
  const [bubblePos, setBubblePos] = useState({
    x: 8,
    y: 12 + activeIndex * 60,
    width: 48,
    height: 48,
    ready: true,
  });

  const updateBubble = useCallback(() => {
    const el = itemRefs.current[activeIndex];
    if (el) {
      setBubblePos({
        x: el.offsetLeft,
        y: el.offsetTop,
        width: el.offsetWidth || 48,
        height: el.offsetHeight || 48,
        ready: true,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    updateBubble();
    window.addEventListener('resize', updateBubble);
    return () => window.removeEventListener('resize', updateBubble);
  }, [updateBubble]);

  return (
    <aside className="vision-dock-container" aria-label="Main Navigation">
      <nav className="vision-dock">
        {/* Dynamic flowing liquid bubble indicator */}
        <div
          className="dock-bubble-indicator"
          style={{
            transform: `translate3d(${bubblePos.x}px, ${bubblePos.y}px, 0)`,
            width: `${bubblePos.width}px`,
            height: `${bubblePos.height}px`,
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
              className={`vision-dock-item${isActive ? ' active' : ''}`}
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
