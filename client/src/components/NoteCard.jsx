import React from 'react';
import { Eye, Edit3, Trash2, Clock, Pin } from 'lucide-react';
import { formatRelativeDate, formatFullDate } from '../utils/formatDate';

/**
 * NoteCard Component
 * Displays a single note with preview, metadata, and quick action buttons
 */
export const NoteCard = ({
  note,
  onView,
  onEdit,
  onDelete,
  onTogglePin,
}) => {
  const { _id, title, content, category, pinned, updatedAt, createdAt } = note;

  const handleCardClick = (e) => {
    // Prevent triggering view if an action button was clicked
    if (e.target.closest('button')) return;
    onView(note);
  };

  return (
    <article
      className="note-card"
      id={`note-card-${_id}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View note titled ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView(note);
        }
      }}
    >
      <div className="note-card-top">
        <div className="note-header-row">
          <h3 className="note-title">{title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {pinned && (
              <span title="Pinned note" style={{ color: 'var(--brand-primary)', display: 'flex' }}>
                <Pin size={14} fill="currentColor" />
              </span>
            )}
            <span className="note-category-tag">{category || 'General'}</span>
          </div>
        </div>

        <p className="note-content-preview">
          {content}
        </p>
      </div>

      <div className="note-footer">
        <div
          className="note-timestamp"
          title={`Created: ${formatFullDate(createdAt)}\nUpdated: ${formatFullDate(updatedAt)}`}
        >
          <Clock size={13} aria-hidden="true" />
          <span>Updated {formatRelativeDate(updatedAt)}</span>
        </div>

        <div className="note-actions" onClick={(e) => e.stopPropagation()}>
          {onTogglePin && (
            <button
              type="button"
              className="card-action-btn"
              onClick={() => onTogglePin(note)}
              title={pinned ? 'Unpin note' : 'Pin note to top'}
              aria-label={pinned ? 'Unpin note' : 'Pin note to top'}
              id={`btn-pin-${_id}`}
            >
              <Pin size={15} fill={pinned ? 'currentColor' : 'none'} color={pinned ? 'var(--brand-primary)' : 'currentColor'} />
            </button>
          )}

          <button
            type="button"
            className="card-action-btn"
            onClick={() => onView(note)}
            title="Read full note"
            aria-label={`Read full note: ${title}`}
            id={`btn-view-${_id}`}
          >
            <Eye size={15} />
          </button>

          <button
            type="button"
            className="card-action-btn"
            onClick={() => onEdit(note)}
            title="Edit note"
            aria-label={`Edit note: ${title}`}
            id={`btn-edit-${_id}`}
          >
            <Edit3 size={15} />
          </button>

          <button
            type="button"
            className="card-action-btn delete-btn"
            onClick={() => onDelete(note)}
            title="Delete note"
            aria-label={`Delete note: ${title}`}
            id={`btn-delete-${_id}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
