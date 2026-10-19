import React, { useState, useRef, useEffect } from 'react';
import { Pin, Star, Trash2, RotateCcw, Palette, Check } from 'lucide-react';
import { formatNoteCreatedDate } from '../utils/formatDate';
import { NOTE_THEME_COLORS, getThemeColorConfig } from '../utils/themeColors';

// Pastel palette directly matching Image 1
const PASTEL_PALETTE = [
  { id: 'lavender', lightBg: '#ede9fe', darkBg: '#2a1a4e', border: '#ddd6fe', text: '#1e1b4b', dot: '#a855f7' },
  { id: 'pink', lightBg: '#fce7f3', darkBg: '#401529', border: '#fbcfe8', text: '#500724', dot: '#ec4899' },
  { id: 'yellow', lightBg: '#fef9c3', darkBg: '#3d2e08', border: '#fef08a', text: '#422006', dot: '#eab308' },
  { id: 'green', lightBg: '#dcfce7', darkBg: '#0f331f', border: '#bbf7d0', text: '#052e16', dot: '#22c55e' },
  { id: 'sky', lightBg: '#e0f2fe', darkBg: '#0d2d44', border: '#bae6fd', text: '#082f49', dot: '#0ea5e9' },
];

/**
 * NoteCard Component
 * Redesigned to match user's reference (Image 1):
 * - Clean pastel sticky note style
 * - Top-right: Pin (📌), Star / Favorite (⭐), and Trash (🗑️)
 * - Bottom-left: Created date formatted as date-month-year
 */
export const NoteCard = ({
  note,
  onView,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleFavorite,
  onToggleArchive,
  onRestore,
  onUpdateColor,
  isTrashView = false,
  index = 0,
}) => {
  const { _id, title, content, pinned, favorite, color, createdAt, trashed, archived } = note;
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerRef = useRef(null);

  // Close color picker on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setIsColorPickerOpen(false);
      }
    };
    if (isColorPickerOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isColorPickerOpen]);

  // Determine pastel colors: use selected color config or cycle pastel palette by index
  let colorConfig = getThemeColorConfig(color);
  if (!color || color === '#ffffff' || color === 'default') {
    const fallback = PASTEL_PALETTE[index % PASTEL_PALETTE.length];
    colorConfig = {
      ...colorConfig,
      lightBg: fallback.lightBg,
      darkBg: fallback.darkBg,
      border: fallback.border,
      dot: fallback.dot,
    };
  }

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.closest('.card-color-popover')) return;
    onView ? onView(note) : onEdit && onEdit(note);
  };

  const isFavorite = Boolean(favorite);
  const isPinned = Boolean(pinned);

  return (
    <article
      className="pastel-note-card"
      id={`note-card-${_id}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`Note: ${title}`}
      style={{
        '--card-bg-light': colorConfig.lightBg,
        '--card-bg-dark': colorConfig.darkBg,
        '--card-border': colorConfig.border || 'transparent',
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView ? onView(note) : onEdit && onEdit(note);
        }
      }}
    >
      {/* Header: Title on Left, Action Icons on Right (matching Image 1) */}
      <div className="pastel-card-header">
        <h3 className="pastel-card-title">{title}</h3>

        <div className="pastel-card-actions" onClick={(e) => e.stopPropagation()}>
          {/* Quick Color Palette Button */}
          <div className="color-picker-wrapper" ref={colorPickerRef}>
            <button
              type="button"
              className="pastel-action-btn color-btn"
              onClick={() => setIsColorPickerOpen((prev) => !prev)}
              title="Change color theme"
              aria-label="Change color theme"
            >
              <Palette size={16} />
            </button>

            {isColorPickerOpen && (
              <div className="card-color-popover" role="dialog" aria-label="Choose note color">
                {NOTE_THEME_COLORS.map((c) => {
                  const isSelected = (color || '').toLowerCase() === c.colorHex.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`mini-color-swatch ${isSelected ? 'selected' : ''}`}
                      style={{ backgroundColor: c.dot }}
                      title={c.name}
                      onClick={() => {
                        onUpdateColor && onUpdateColor(_id, c.colorHex);
                        setIsColorPickerOpen(false);
                      }}
                    >
                      {isSelected && <Check size={10} color="#0f172a" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 1. Pin Icon (📌) */}
          {!isTrashView && onTogglePin && (
            <button
              type="button"
              className={`pastel-action-btn pin-btn ${isPinned ? 'active' : ''}`}
              onClick={() => onTogglePin(note)}
              title={isPinned ? 'Unpin note' : 'Pin note'}
              aria-label={isPinned ? 'Unpin note' : 'Pin note'}
              id={`btn-pin-${_id}`}
            >
              <Pin
                size={17}
                fill={isPinned ? 'currentColor' : 'none'}
                strokeWidth={isPinned ? 2.5 : 2}
              />
            </button>
          )}

          {/* 2. Star / Favorite Icon (⭐) */}
          {!isTrashView && onToggleFavorite && (
            <button
              type="button"
              className={`pastel-action-btn star-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(note)}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              id={`btn-star-${_id}`}
            >
              <Star
                size={17}
                fill={isFavorite ? 'currentColor' : 'none'}
                strokeWidth={isFavorite ? 2.2 : 2}
              />
            </button>
          )}

          {/* 3. Trash / Delete Icon (🗑️) */}
          <button
            type="button"
            className="pastel-action-btn delete-btn"
            onClick={() => onDelete(note)}
            title={isTrashView ? 'Delete permanently' : 'Move to trash'}
            aria-label={isTrashView ? 'Delete permanently' : 'Move to trash'}
            id={`btn-delete-${_id}`}
          >
            <Trash2 size={17} strokeWidth={2} />
          </button>

          {/* Restore Button (when viewing Trash) */}
          {isTrashView && onRestore && (
            <button
              type="button"
              className="pastel-action-btn restore-btn"
              onClick={() => onRestore(note)}
              title="Restore note"
              aria-label="Restore note"
              id={`btn-restore-${_id}`}
            >
              <RotateCcw size={17} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Body: Note Content Preview */}
      <div className="pastel-card-body">
        <p className="pastel-card-content">{content}</p>
      </div>

      {/* Footer: Created Date (date-month-year, matching Image 1 e.g. 8/1/2026) */}
      <div className="pastel-card-footer">
        <span className="pastel-card-date" title={`Created: ${new Date(createdAt).toLocaleString()}`}>
          {formatNoteCreatedDate(createdAt)}
        </span>
      </div>
    </article>
  );
};

export default NoteCard;
