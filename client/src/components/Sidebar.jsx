import React from 'react';
import { Feather, Home, Star, Trash2, Moon, Sun, Download } from 'lucide-react';

/**
 * Sidebar Component
 * Left-side navigation directly matching the user's reference:
 * - NoteNest logo with feather badge & "Small notes. Big dreams. ✨" tagline
 * - "Home", "Favorites", "Trash" navigation links
 * - Theme toggle and download export buttons at bottom
 */
export const Sidebar = ({
  activeNav = 'home',
  onSelectNav,
  allCount = 0,
  favoritesCount = 0,
  trashCount = 0,
  theme = 'light',
  onToggleTheme,
  onExportNotes,
  onReturnToWelcome,
}) => {
  return (
    <aside className="app-sidebar" aria-label="Main Navigation Sidebar">
      {/* Sidebar Header with Feather badge, NoteNest brand & Tagline */}
      <div className="sidebar-header">
        <div
          className="sidebar-brand-container"
          onClick={onReturnToWelcome}
          style={{ cursor: onReturnToWelcome ? 'pointer' : 'default' }}
          title={onReturnToWelcome ? 'View Welcome Screen' : 'NoteNest'}
        >
          <div className="sidebar-logo-circle">
            <Feather size={22} className="sidebar-feather-icon" />
          </div>
          <div className="sidebar-brand-text-col">
            <h1 className="sidebar-brand-title">NoteNest</h1>
            <span className="sidebar-tagline">Small notes. Big dreams. ✨</span>
          </div>
        </div>
      </div>

      {/* Navigation Links matching reference */}
      <nav className="sidebar-nav" role="navigation">
        {/* Home */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeNav === 'home' || activeNav === 'all' ? 'active' : ''}`}
          onClick={() => onSelectNav('home')}
          id="nav-home"
        >
          <Home size={20} className="nav-item-icon" />
          <span className="nav-item-text">Home</span>
          {allCount > 0 && <span className="nav-item-badge">{allCount}</span>}
        </button>

        {/* Favorites */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeNav === 'favorites' ? 'active' : ''}`}
          onClick={() => onSelectNav('favorites')}
          id="nav-favorites"
        >
          <Star size={20} className="nav-item-icon" />
          <span className="nav-item-text">Favorites</span>
          {favoritesCount > 0 && <span className="nav-item-badge">{favoritesCount}</span>}
        </button>

        {/* Trash */}
        <button
          type="button"
          className={`sidebar-nav-item ${activeNav === 'trash' ? 'active' : ''}`}
          onClick={() => onSelectNav('trash')}
          id="nav-trash"
        >
          <Trash2 size={20} className="nav-item-icon" />
          <span className="nav-item-text">Trash</span>
          {trashCount > 0 && <span className="nav-item-badge">{trashCount}</span>}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
