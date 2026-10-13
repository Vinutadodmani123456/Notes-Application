import React, { useState } from 'react';
import { X, Edit3, Calendar, Clock, Copy, Check } from 'lucide-react';
import { formatFullDate } from '../utils/formatDate';
import toast from 'react-hot-toast';

/**
 * ViewNoteModal Component
 * Modal to display complete note content without truncation, plus metadata and edit trigger
 */
export const ViewNoteModal = ({
  note,
  isOpen,
  onClose,
  onEdit,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !note) return null;

  const handleCopy = () => {
    const textToCopy = `${note.title}\n\n${note.content}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Note copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-note-title"
    >
      <div className="modal-content" style={{ maxWidth: '680px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
            <span className="note-category-tag">{note.category || 'General'}</span>
            <h2
              className="modal-title"
              id="view-note-title"
              style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {note.title}
            </h2>
          </div>
          <button
            type="button"
            className="btn-ghost"
            onClick={onClose}
            aria-label="Close note preview"
            id="btn-close-view-note"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Metadata banner */}
          <div className="view-note-meta">
            <div className="view-meta-item">
              <Calendar size={14} />
              <span>Created on: {formatFullDate(note.createdAt)}</span>
            </div>
            <div className="view-meta-item">
              <Clock size={14} />
              <span>Last updated: {formatFullDate(note.updatedAt)}</span>
            </div>
          </div>

          {/* Full content */}
          <div className="view-note-content" id="full-note-body">
            {note.content}
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCopy}
            title="Copy note text"
            id="btn-copy-note"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy Text'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            id="btn-close-view"
          >
            Close
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onEdit(note);
            }}
            id="btn-edit-from-view"
          >
            <Edit3 size={16} />
            Edit Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNoteModal;
