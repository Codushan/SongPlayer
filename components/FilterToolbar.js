'use client';

const ERA_OPTIONS = [
  { id: 'all', label: 'All Eras' },
  { id: '2020s', label: '2020s (Trending)' },
  { id: '2010s', label: '2010s (Blockbusters)' },
  { id: '2000s', label: '2000s (Pop Revolution)' },
  { id: '90s', label: '90s (Cassette Era)' },
  { id: 'classic', label: '60s-80s (Golden Classics)' },
];

export default function FilterToolbar({
  activeEra,
  onSelectEra,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  songsCount,
  showOnlyFavorites,
}) {
  return (
    <div className="filter-toolbar-container">
      <div className="filter-toolbar vision-filter-bar">
        <div className="filter-group filter-eras">
          <span className="filter-label">
            <i className="fa-regular fa-clock" /> Decades:
          </span>
          <div className="filter-eras-scroll">
            {ERA_OPTIONS.map((era) => (
              <button
                key={era.id}
                className={`filter-btn${activeEra === era.id ? ' active' : ''}`}
                data-era={era.id}
                onClick={() => onSelectEra(era.id)}
              >
                {era.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group filter-sort-and-view">
          <div className="sort-wrapper">
            <span className="filter-label">
              <i className="fa-solid fa-arrow-down-wide-short" /> Sort:
            </span>
            <select
              id="sort-select"
              className="vision-select-pill"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="default">✨ Recommended</option>
              <option value="year-desc">📅 Release (Newest First)</option>
              <option value="year-asc">⏳ Release (Oldest First)</option>
              <option value="title-asc">🔤 Title (A-Z)</option>
              <option value="singer-asc">🎙️ Singer (A-Z)</option>
            </select>
          </div>

          <div className="view-toggle-btns">
            <button
              className={`view-btn${viewMode === 'bars' ? ' active' : ''}`}
              id="view-bars-btn"
              title="Bars / List View"
              onClick={() => onViewModeChange('bars')}
            >
              <i className="fa-solid fa-bars" />
            </button>
            <button
              className={`view-btn${viewMode === 'grid' ? ' active' : ''}`}
              id="view-grid-btn"
              title="Cards Grid View"
              onClick={() => onViewModeChange('grid')}
            >
              <i className="fa-solid fa-grip" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
