import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { NOTE_THEME_COLORS } from '../utils/themeColors';

const CATEGORIES = ['General', 'Work', 'Personal', 'Ideas', 'Study', 'Finance'];

/**
 * NoteForm Component
 * Modal form for creating and editing notes with client-side validation
 */
export const NoteForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [color, setColor] = useState('#ffffff');
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(initialData && initialData._id);

  // Sync state when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setCategory(initialData.category || 'General');
      setColor(initialData.color || '#ffffff');
    } else {
      setTitle('');
      setContent('');
      setCategory('General');
      setColor('#ffffff');
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required and cannot be blank.';
    } else if (title.trim().length > 150) {
      newErrors.title = 'Title cannot exceed 150 characters.';
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required and cannot be blank.';
    } else if (content.trim().length > 10000) {
      newErrors.content = 'Content cannot exceed 10,000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      category: category.trim(),
      color: color || '#ffffff',
    });
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {isEditMode ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button
            type="button"
            className="btn-ghost"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            id="btn-close-note-form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Title field */}
            <div className="form-group">
              <label htmlFor="note-title-input" className="form-label">
                <span>Note Title <span style={{ color: 'var(--danger)' }}>*</span></span>
                <span className="character-count">{title.length}/150</span>
              </label>
              <input
                type="text"
                id="note-title-input"
                className="form-input"
                placeholder="e.g., Q4 Roadmap & Strategic Initiatives"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: null }));
                }}
                maxLength={150}
                autoFocus
                disabled={isSubmitting}
              />
              {errors.title && (
                <div className="form-error-msg" role="alert">
                  <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                  {errors.title}
                </div>
              )}
            </div>

            {/* Category and Color Row */}
            <div className="form-row-two-col">
              {/* Category field */}
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="note-category-select" className="form-label">
                  Category
                </label>
                <select
                  id="note-category-select"
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isSubmitting}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme Color Picker */}
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">
                  Note Color Theme
                </label>
                <div className="color-swatch-picker" role="radiogroup" aria-label="Select note color theme">
                  {NOTE_THEME_COLORS.map((c) => {
                    const isSelected = (color || '#ffffff').toLowerCase() === c.colorHex.toLowerCase();
                    return (
                      <button
                        key={c.id}
                        type="button"
                        className={`color-swatch-circle ${isSelected ? 'selected' : ''}`}
                        style={{ backgroundColor: c.dot }}
                        onClick={() => setColor(c.colorHex)}
                        title={c.name}
                        aria-label={c.name}
                        aria-checked={isSelected}
                        role="radio"
                      >
                        {isSelected && <Check size={11} color={c.id === 'lemon' || c.id === 'default' ? '#0f172a' : '#ffffff'} strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Content field */}
            <div className="form-group">
              <label htmlFor="note-content-input" className="form-label">
                <span>Note Content <span style={{ color: 'var(--danger)' }}>*</span></span>
                <span className="character-count">{content.length}/10,000</span>
              </label>
              <textarea
                id="note-content-input"
                className="form-textarea"
                placeholder="Write your note here... (supports multiline text)"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errors.content) setErrors((prev) => ({ ...prev, content: null }));
                }}
                maxLength={10000}
                disabled={isSubmitting}
              />
              {errors.content && (
                <div className="form-error-msg" role="alert">
                  <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                  {errors.content}
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
              id="btn-cancel-note-form"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              id="btn-save-note"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} />
                  {isEditMode ? 'Save Changes' : 'Create Note'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
