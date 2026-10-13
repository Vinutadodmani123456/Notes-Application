import React from 'react';
import { BookOpen, SearchX, AlertTriangle, RefreshCw, Plus } from 'lucide-react';

/**
 * EmptyState Component
 * Displays friendly welcoming state, search empty state, or connection error state
 */
export const EmptyState = ({
  type = 'empty', // 'empty' | 'search' | 'error'
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

  return (
    <div className="state-container">
      <div className="state-icon-wrapper">
        <BookOpen size={32} />
      </div>
      <h3 className="state-title">Capture Your Thoughts</h3>
      <p className="state-desc">
        Welcome to NoteNest! You don't have any saved notes yet. Click the button below to create and organize your very first note.
      </p>
      {onAction && (
        <button className="btn btn-primary" onClick={onAction} id="btn-create-first-note">
          <Plus size={18} />
          Create Your First Note
        </button>
      )}
    </div>
  );
};

export default EmptyState;
