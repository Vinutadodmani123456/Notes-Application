import React from 'react';

/**
 * Category Card Data with realistic cover backgrounds and custom stylized icon badges
 * directly inspired by the user's reference design
 */
export const CATEGORY_CARDS = [
  {
    id: 'All',
    label: 'All Notes',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80',
    iconBg: '#dbeafe',
    renderBadge: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="4" fill="#3b82f6" />
        <path d="M4 21c0-4.418 3.582-8 8-8s8 3.582 8 8" fill="#1e40af" />
        <path d="M12 13l-1.5 5 1.5 3 1.5-3z" fill="#ef4444" />
      </svg>
    ),
  },
  {
    id: 'Study',
    label: 'Study Notes',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
    iconBg: '#fef3c7',
    renderBadge: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4.5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
        <circle cx="9.5" cy="8" r="1.5" stroke="#1f2937" strokeWidth="1.5" fill="none" />
        <circle cx="14.5" cy="8" r="1.5" stroke="#1f2937" strokeWidth="1.5" fill="none" />
        <line x1="11" y1="8" x2="13" y2="8" stroke="#1f2937" strokeWidth="1.5" />
        <path d="M5 21c0-3.866 3.134-7 7-7s7 3.134 7 7" fill="#0284c7" />
        <path d="M12 14l-1 4 1 3 1-3z" fill="#ef4444" />
      </svg>
    ),
  },
  {
    id: 'Work',
    label: 'Work Notes',
    coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80',
    iconBg: '#e0f2fe',
    renderBadge: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="13" rx="2" fill="#0284c7" />
        <rect x="4" y="5" width="16" height="9" rx="1" fill="#f8fafc" />
        <rect x="6" y="7" width="5" height="5" rx="0.5" fill="#38bdf8" />
        <line x1="13" y1="7" x2="18" y2="7" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="10" x2="17" y2="10" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 20h8M12 16v4" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'Ideas',
    label: 'Ideas',
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80',
    iconBg: '#fef08a',
    renderBadge: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 18h6m-4 3h2m-6-10a5 5 0 1 1 8 0c-.8 1.1-1.5 2-2 3H11c-.5-1-1.2-1.9-2-3z"
          stroke="#ca8a04"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#fef08a"
        />
        <circle cx="18" cy="6" r="2.5" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
      </svg>
    ),
  },
  {
    id: 'Personal',
    label: 'Personal Notes',
    coverImage: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=400&q=80',
    iconBg: '#fee2e2',
    renderBadge: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#ef4444"
        />
      </svg>
    ),
  },
  {
    id: 'General',
    label: 'General',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80',
    iconBg: '#ede9fe',
    renderBadge: () => (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" fill="#8b5cf6" />
        <line x1="8" y1="7" x2="16" y2="7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="11" x2="16" y2="11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="15" x2="12" y2="15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const CategoryCardList = ({ activeCategory, onSelectCategory, counts = {} }) => {
  return (
    <section className="category-cards-section" aria-label="Category Selection Carousel">
      <div className="category-cards-container">
        {CATEGORY_CARDS.map((cat) => {
          const isActive =
            activeCategory.toLowerCase() === cat.id.toLowerCase() ||
            (cat.id === 'All' && activeCategory === 'All');
          const count = counts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              type="button"
              className={`category-visual-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isActive}
              id={`cat-card-${cat.id.toLowerCase()}`}
            >
              <div
                className="category-card-thumb"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.45)), url(${cat.coverImage})`,
                }}
              >
                <div
                  className="category-badge-circle"
                  style={{ backgroundColor: cat.iconBg }}
                >
                  {cat.renderBadge()}
                </div>
              </div>

              <div className="category-card-info">
                <span className="category-card-label">{cat.label}</span>
                <span className="category-card-count">{count}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryCardList;
