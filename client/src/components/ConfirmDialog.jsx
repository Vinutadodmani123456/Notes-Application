import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

/**
 * ConfirmDialog Component
 * Modal to confirm irreversible actions like note deletion
 */
export const ConfirmDialog = ({
  isOpen,
  title = 'Delete Note',
  message = 'Are you sure you want to delete this note?',
  noteTitle = '',
  confirmLabel = 'Delete Note',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
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

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isConfirming) onCancel();
      }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-desc"
    >
      <div className="modal-content" style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--danger-subtle)',
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={18} />
            </div>
            <h2 className="modal-title" id="confirm-dialog-title" style={{ fontSize: '1.15rem' }}>
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="btn-ghost"
            onClick={onCancel}
            disabled={isConfirming}
            aria-label="Close dialog"
            id="btn-close-confirm-dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" id="confirm-dialog-desc">
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {message}
          </p>
          {noteTitle && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                wordBreak: 'break-word',
              }}
            >
              "{noteTitle}"
            </div>
          )}
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            This action cannot be undone and will permanently remove this record from MongoDB.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isConfirming}
            id="btn-cancel-delete"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isConfirming}
            id="btn-confirm-delete"
          >
            {isConfirming ? (
              <>
                <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px', borderTopColor: '#fff' }} />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                {confirmLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
