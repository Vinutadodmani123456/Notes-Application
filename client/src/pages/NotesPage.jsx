import React, { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { LayoutGrid, List, Plus } from 'lucide-react';
import notesApi, { getErrorMessage } from '../services/notesApi';
import useDebounce from '../hooks/useDebounce';
import Header from '../components/Header';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import ViewNoteModal from '../components/ViewNoteModal';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';

const CATEGORIES = ['All', 'Work', 'Personal', 'Ideas', 'Study', 'Finance', 'General'];

export const NotesPage = () => {
  // Theme state with local persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('notenest_theme') || 'light';
  });

  // Notes data state
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 250);
  const [activeCategory, setActiveCategory] = useState('All');

  // Layout View Mode (grid vs list)
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('notenest_view_mode') || 'grid';
  });

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);
  const [deletingNote, setDeletingNote] = useState(null);

  // Async action processing states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('notenest_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem('notenest_view_mode', mode);
  };

  /**
   * Fetch notes from MongoDB backend
   */
  const loadNotes = useCallback(async (query = '') => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const response = await notesApi.getNotes(query);
      if (response && response.success) {
        setNotes(response.data || []);
      }
    } catch (err) {
      const errMsg = getErrorMessage(err);
      setFetchError(errMsg);
      toast.error(errMsg, { id: 'fetch-error' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch when debounced search term changes
  useEffect(() => {
    loadNotes(debouncedSearch);
  }, [debouncedSearch, loadNotes]);

  /**
   * Handle Create or Update Note Submission
   */
  const handleSaveNote = async (formData) => {
    try {
      setIsSubmitting(true);

      if (editingNote) {
        // Update existing note
        const response = await notesApi.updateNote(editingNote._id, formData);
        if (response.success) {
          // Synchronize local state with server confirmed record
          setNotes((prev) =>
            prev.map((n) => (n._id === editingNote._id ? response.data : n))
          );
          // If viewing this note, update viewer too
          if (viewingNote && viewingNote._id === editingNote._id) {
            setViewingNote(response.data);
          }
          toast.success('Note updated successfully!');
          setIsFormOpen(false);
          setEditingNote(null);
        }
      } else {
        // Create new note
        const response = await notesApi.createNote(formData);
        if (response.success) {
          // Prepend new note to list
          setNotes((prev) => [response.data, ...prev]);
          toast.success('Note created successfully!');
          setIsFormOpen(false);
        }
      }
    } catch (err) {
      const errMsg = getErrorMessage(err);
      toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle Delete Note
   */
  const handleConfirmDelete = async () => {
    if (!deletingNote) return;
    try {
      setIsDeleting(true);
      const response = await notesApi.deleteNote(deletingNote._id);
      if (response.success) {
        setNotes((prev) => prev.filter((n) => n._id !== deletingNote._id));
        if (viewingNote && viewingNote._id === deletingNote._id) {
          setViewingNote(null);
        }
        toast.success('Note deleted successfully!');
        setDeletingNote(null);
      }
    } catch (err) {
      const errMsg = getErrorMessage(err);
      toast.error(errMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Toggle Pin note status
   */
  const handleTogglePin = async (note) => {
    try {
      const newPinned = !note.pinned;
      const response = await notesApi.updateNote(note._id, { pinned: newPinned });
      if (response.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === note._id ? response.data : n))
        );
        toast.success(newPinned ? 'Note pinned to top' : 'Note unpinned');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  // Filter notes by selected category and prioritize pinned notes
  const displayedNotes = useMemo(() => {
    let filtered = notes;

    if (activeCategory !== 'All') {
      filtered = filtered.filter(
        (n) => (n.category || 'General').toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Sort: pinned first, then by updatedAt descending
    return [...filtered].sort((a, b) => {
      if (a.pinned === b.pinned) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return a.pinned ? -1 : 1;
    });
  }, [notes, activeCategory]);

  return (
    <>
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNewNote={() => {
          setEditingNote(null);
          setIsFormOpen(true);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Dashboard */}
      <main className="dashboard-main">
        {/* Sub-header Toolbar */}
        <section className="dashboard-toolbar">
          <div className="toolbar-info">
            <h2 className="toolbar-title">
              {searchQuery ? 'Search Results' : 'My Notes'}
            </h2>
            <span className="notes-count-badge" id="notes-counter">
              {displayedNotes.length} {displayedNotes.length === 1 ? 'note' : 'notes'}
            </span>
          </div>

          <div className="toolbar-controls">
            <div className="view-toggle-group" role="group" aria-label="Layout view options">
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => handleViewModeChange('grid')}
                title="Grid View"
                aria-label="Grid View"
                id="btn-view-grid"
              >
                <LayoutGrid size={15} />
                <span>Grid</span>
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => handleViewModeChange('list')}
                title="List View"
                aria-label="List View"
                id="btn-view-list"
              >
                <List size={15} />
                <span>List</span>
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setEditingNote(null);
                setIsFormOpen(true);
              }}
              id="btn-new-note-toolbar"
            >
              <Plus size={16} />
              <span>Add Note</span>
            </button>
          </div>
        </section>

        {/* Category Filters Bar */}
        <div className="category-filter-bar" role="tablist" aria-label="Category filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              id={`filter-category-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Area: Loading / Error / Empty / Grid */}
        {isLoading ? (
          <LoadingSpinner message="Synchronizing with MongoDB..." size="lg" />
        ) : fetchError ? (
          <EmptyState
            type="error"
            errorMessage={fetchError}
            onAction={() => loadNotes(debouncedSearch)}
          />
        ) : displayedNotes.length === 0 ? (
          searchQuery ? (
            <EmptyState
              type="search"
              searchQuery={searchQuery}
              onAction={() => setSearchQuery('')}
            />
          ) : (
            <EmptyState
              type="empty"
              onAction={() => {
                setEditingNote(null);
                setIsFormOpen(true);
              }}
            />
          )
        ) : (
          <div className={viewMode === 'list' ? 'notes-list' : 'notes-grid'} id="notes-container">
            {displayedNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onView={(n) => setViewingNote(n)}
                onEdit={(n) => {
                  setEditingNote(n);
                  setIsFormOpen(true);
                }}
                onDelete={(n) => setDeletingNote(n)}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          NoteNest &bull; Built with React, Vite, Node.js, Express &amp; MongoDB &bull; Single-User Internship Edition
        </p>
      </footer>

      {/* Create / Edit Note Form Modal */}
      <NoteForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingNote(null);
        }}
        onSubmit={handleSaveNote}
        initialData={editingNote}
        isSubmitting={isSubmitting}
      />

      {/* Full Note View Modal */}
      <ViewNoteModal
        isOpen={Boolean(viewingNote)}
        note={viewingNote}
        onClose={() => setViewingNote(null)}
        onEdit={(n) => {
          setEditingNote(n);
          setIsFormOpen(true);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingNote)}
        noteTitle={deletingNote?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingNote(null)}
        isConfirming={isDeleting}
      />
    </>
  );
};

export default NotesPage;
