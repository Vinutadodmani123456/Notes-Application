import React, { useEffect } from 'react';
import { Trash2, RotateCcw, X } from 'lucide-react';

/**
 * ConfirmDialog Component
 * - For active notes: confirms deletion
 * - For trash section: asks user to Restore or permanently Delete note
 */
export const ConfirmDialog = ({
  isOpen,
  title = 'Delete Note?',
  noteTitle = '',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  onRestore, // Callback if user chooses to restore
  isConfirming = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isConfirming) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isConfirming, onCancel]);

  if (!isOpen) return null;

  const isTrashSection = Boolean(onRestore);

  return (
    <div
      className="modal-overlay delete-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isConfirming) onCancel();
      }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="delete-dialog-card">
        {/* Top-Right Close 'x' Button */}
        <button
          type="button"
          className="delete-dialog-close-btn"
          onClick={onCancel}
          disabled={isConfirming}
          aria-label="Close dialog"
          id="btn-close-delete-dialog"
        >
          <X size={18} />
        </button>

        {/* Circular Pink/Red Badge with Trash Icon */}
        <div className="delete-icon-circle-badge">
          <Trash2 size={30} className="delete-badge-trash-icon" strokeWidth={2.2} />
        </div>

        {/* Heading: "Delete or Restore Note?" or "Delete Note?" */}
        <h3 className="delete-dialog-heading" id="delete-dialog-title">
          {isTrashSection ? 'Delete or Restore Note?' : title}
        </h3>

        {/* Message */}
        <div className="delete-dialog-message-box">
          <p className="delete-dialog-prompt">
            {isTrashSection
              ? `What would you like to do with ${noteTitle ? `"${noteTitle}"` : 'this note'}?`
              : `Are you sure you want to delete ${noteTitle ? `"${noteTitle}"` : 'this note'}?`}
          </p>
          <p className="delete-dialog-subtext">
            {isTrashSection
              ? 'You can restore it to your notes or permanently delete it.'
              : 'This action cannot be undone.'}
          </p>
        </div>

        {/* Actions Row */}
        <div className={`delete-dialog-actions-row ${isTrashSection ? 'has-restore' : ''}`}>
          <button
            type="button"
            className="delete-btn-cancel"
            onClick={onCancel}
            disabled={isConfirming}
            id="btn-cancel-delete"
          >
            {cancelLabel}
          </button>

          {/* Restore Button (Shown in Trash Section) */}
          {isTrashSection && (
            <button
              type="button"
              className="delete-btn-restore"
              onClick={onRestore}
              disabled={isConfirming}
              id="btn-restore-from-dialog"
            >
              <RotateCcw size={16} strokeWidth={2.2} />
              <span>Restore</span>
            </button>
          )}

          {/* Delete Button */}
          <button
            type="button"
            className="delete-btn-confirm"
            onClick={onConfirm}
            disabled={isConfirming}
            id="btn-confirm-delete"
          >
            {isConfirming ? (
              <>
                <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px', borderTopColor: '#fff' }} />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} strokeWidth={2.2} />
                <span>{confirmLabel}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
