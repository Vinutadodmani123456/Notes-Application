import React from 'react';
import { Feather, Plus, Moon, Sun } from 'lucide-react';
import SearchBar from './SearchBar';

/**
 * Header Component
 * Top navigation bar containing Logo, SearchBar, New Note button, and Theme Toggle
 */
export const Header = ({
  searchQuery,
  setSearchQuery,
  onNewNote,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo and App Title */}
        <div
          className="logo-container"
          onClick={() => setSearchQuery('')}
          role="button"
          tabIndex={0}
          title="NoteNest - Full-Stack Notes Application"
        >
          <div className="logo-badge">
            <Feather size={22} />
          </div>
          <div className="logo-text-group">
            <h1 className="logo-title">NoteNest</h1>
            <span className="logo-tagline">Smart Personal Workspace</span>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Action buttons: Theme toggle & New Note */}
        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="btn-toggle-theme"
          >
            {theme === 'dark' ? <Sun size={19} color="#fbbf24" /> : <Moon size={19} />}
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onNewNote}
            id="btn-new-note-header"
          >
            <Plus size={18} />
            <span>New Note</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
