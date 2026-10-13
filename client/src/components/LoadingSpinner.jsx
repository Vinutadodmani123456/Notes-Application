import React from 'react';

/**
 * LoadingSpinner Component
 * Reusable animated spinner with optional loading message
 */
export const LoadingSpinner = ({ message = 'Loading notes...', size = 'default' }) => {
  return (
    <div className="state-container" role="status" aria-live="polite">
      <div className={`spinner ${size === 'lg' ? 'spinner-lg' : ''}`} aria-hidden="true" />
      {message && <p className="state-desc" style={{ fontWeight: 500 }}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
