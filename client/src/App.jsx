import React from 'react';
import { Toaster } from 'react-hot-toast';
import NotesPage from './pages/NotesPage';

export function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'var(--bg-modal)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-lg)',
            fontSize: '0.875rem',
            fontFamily: 'inherit',
            fontWeight: 500,
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <NotesPage />
    </>
  );
}

export default App;
