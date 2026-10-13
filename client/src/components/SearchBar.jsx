import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar Component
 * Header search bar supporting instant filtering and clearing
 */
export const SearchBar = ({ searchQuery, setSearchQuery, placeholder = 'Search notes by title or content...' }) => {
  const inputRef = useRef(null);

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="search-wrapper">
      <div className="search-input-container">
        <Search size={18} className="search-icon" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          id="search-notes-input"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search notes"
        />
        {searchQuery ? (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => {
              setSearchQuery('');
              inputRef.current?.focus();
            }}
            title="Clear search"
            aria-label="Clear search"
            id="btn-clear-search-icon"
          >
            <X size={16} />
          </button>
        ) : (
          <span className="search-kbd-hint" aria-hidden="true">/</span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
