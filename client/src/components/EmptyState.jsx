import React from 'react';
import { Plus, SearchX, AlertTriangle, RefreshCw, Trash2, Star, ArrowLeft } from 'lucide-react';

/**
 * EmptyState Component
 * - 'empty': Cute smiling document note matching Image 1
 * - 'trash': Dedicated empty trash state ("Trash is empty")
 * - 'favorites': Dedicated empty favorites state
 * - 'search': Search with no results
 * - 'error': Connection error
 */
export const EmptyState = ({
  type = 'empty', // 'empty' | 'trash' | 'favorites' | 'search' | 'error'
  searchQuery = '',
  onAction,
  errorMessage = '',
}) => {
  if (type === 'error') {
    return (
      <div className="state-container" role="alert">
        <div className="state-icon-wrapper" style={{ color: 'var(--danger)', background: 'var(--danger-subtle)' }}>
          <AlertTriangle size={32} />
        </div>
        <h3 className="state-title">Unable to Connect</h3>
        <p className="state-desc">
          {errorMessage || 'Failed to fetch notes from the server. Please ensure the backend is running and MongoDB is connected.'}
        </p>
        {onAction && (
          <button className="btn btn-primary" onClick={onAction} id="btn-retry-fetch">
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (type === 'search') {
    return (
      <div className="state-container">
        <div className="state-icon-wrapper">
          <SearchX size={32} />
        </div>
        <h3 className="state-title">No notes found</h3>
        <p className="state-desc">
          No notes match your query "{searchQuery}". Try searching for different keywords or clear your search filter.
        </p>
        {onAction && (
          <button className="btn btn-secondary" onClick={onAction} id="btn-clear-search">
            Clear Search Filter
          </button>
        )}
      </div>
    );
  }

  // Dedicated Empty Trash State
  if (type === 'trash') {
    return (
      <div className="empty-state-cute-wrapper empty-trash-wrapper">
        <div className="empty-trash-badge">
          <Trash2 size={44} color="#ef4444" strokeWidth={2} />
        </div>
        <h3 className="empty-cute-title">Trash is empty</h3>
        <p className="empty-cute-subtitle">
          Notes you delete will appear here. You can restore them back to your workspace or permanently delete them.
        </p>
        {onAction && (
          <button
            type="button"
            className="empty-state-action-btn"
            onClick={onAction}
            id="btn-back-to-home"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        )}
      </div>
    );
  }

  // Dedicated Empty Favorites State
  if (type === 'favorites') {
    return (
      <div className="empty-state-cute-wrapper empty-favorites-wrapper">
        <div className="empty-favorites-badge">
          <Star size={44} color="#eab308" strokeWidth={2} fill="#fef08a" />
        </div>
        <h3 className="empty-cute-title">No favorites yet</h3>
        <p className="empty-cute-subtitle">
          Click the star (⭐) icon on any note to save your favorite notes here for quick access.
        </p>
        {onAction && (
          <button
            type="button"
            className="empty-state-action-btn"
            onClick={onAction}
            id="btn-explore-notes"
          >
            <span>Explore Notes</span>
          </button>
        )}
      </div>
    );
  }

  // Default: Cute smiling document note (matching Image 1) for Home with no notes
  return (
    <div className="empty-state-cute-wrapper">
      <div className="empty-cute-art-box">
        <svg
          className="empty-cute-svg"
          viewBox="0 0 260 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ambient soft glow */}
          <circle cx="130" cy="110" r="90" fill="url(#emptyGlow)" opacity="0.6" />

          {/* Left Pastel Leaves */}
          <g transform="translate(45, 90)">
            <path
              d="M30 45 C10 30, 5 5, 25 0 C40 10, 42 35, 30 45 Z"
              fill="url(#emptyLeafCyan)"
            />
            <path
              d="M36 50 C22 40, 18 20, 32 12 C44 20, 46 38, 36 50 Z"
              fill="url(#emptyLeafBlue)"
              opacity="0.85"
            />
          </g>

          {/* Right Pastel Leaves */}
          <g transform="translate(180, 95)">
            <path
              d="M0 45 C20 30, 25 5, 5 0 C-10 10, -12 35, 0 45 Z"
              fill="url(#emptyLeafPurple)"
            />
            <path
              d="M-6 50 C8 40, 12 20, -2 12 C-14 20, -16 38, -6 50 Z"
              fill="url(#emptyLeafCyan)"
              opacity="0.85"
            />
          </g>

          {/* Floating Sparkles / Stars */}
          <path d="M72 45 L74 50 L79 52 L74 54 L72 59 L70 54 L65 52 L70 50 Z" fill="#38bdf8" />
          <path d="M192 40 L193.5 44 L198 45.5 L193.5 47 L192 51 L190.5 47 L186 45.5 L190.5 44 Z" fill="#38bdf8" />
          <circle cx="178" cy="65" r="2.5" fill="#fde047" />
          <circle cx="86" cy="72" r="2.5" fill="#fde047" />

          {/* Smiling Document Note Container */}
          <g transform="translate(90, 35)">
            {/* Note Shadow */}
            <rect x="5" y="8" width="76" height="106" rx="14" fill="rgba(99, 102, 241, 0.14)" />

            {/* Note Body with rounded corners */}
            <path
              d="M 12 0 L 60 0 L 76 16 L 76 96 C 76 102.6, 70.6 108, 64 108 L 12 108 C 5.4 108, 0 102.6, 0 96 L 0 12 C 0 5.4, 5.4 0, 12 0 Z"
              fill="#ffffff"
              stroke="#6366f1"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Folded Top-Right Corner */}
            <path
              d="M 60 0 L 60 14 C 60 16, 62 18, 64 18 L 76 18 Z"
              fill="#ede9fe"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Pin / binder dot */}
            <circle cx="12" cy="15" r="3" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Top ruled line */}
            <line x1="22" y1="26" x2="62" y2="26" stroke="#c7d2fe" strokeWidth="3" strokeLinecap="round" />

            {/* Cute Happy Smiling Face */}
            <circle cx="28" cy="40" r="3.2" fill="#312e81" />
            <circle cx="48" cy="40" r="3.2" fill="#312e81" />

            {/* Cheerful Smile */}
            <path
              d="M 33 46 Q 38 53, 43 46"
              fill="none"
              stroke="#4338ca"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Blush Cheeks */}
            <ellipse cx="23" cy="46" rx="4.5" ry="2.5" fill="#fbcfe8" />
            <ellipse cx="53" cy="46" rx="4.5" ry="2.5" fill="#fbcfe8" />

            {/* Lower Lines */}
            <line x1="16" y1="62" x2="60" y2="62" stroke="#e0e7ff" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="16" y1="74" x2="35" y2="74" stroke="#e0e7ff" strokeWidth="3.2" strokeLinecap="round" />
          </g>

          {/* Gradients */}
          <defs>
            <radialGradient id="emptyGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#e0e7ff" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="emptyLeafCyan" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="emptyLeafBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="emptyLeafPurple" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <h3 className="empty-cute-title">No notes yet!</h3>

      <p className="empty-cute-subtitle">
        Create your first note and start capturing your thoughts, ideas and plans.
      </p>

      {onAction && (
        <button
          type="button"
          className="empty-cute-btn"
          onClick={onAction}
          id="btn-create-first-note"
        >
          <Plus size={18} strokeWidth={2.8} />
          <span>Create Your First Note</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
