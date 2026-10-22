import React, { useState, useEffect, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import { LayoutGrid, List, Plus, ArrowUpDown, Star, Trash2, Search } from 'lucide-react';
import notesApi, { getErrorMessage } from '../services/notesApi';
import useDebounce from '../hooks/useDebounce';
import Sidebar from '../components/Sidebar';
import HeroBanner from '../components/HeroBanner';
import CategoryCardList from '../components/CategoryCardList';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import ViewNoteModal from '../components/ViewNoteModal';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';

export const NotesPage = ({ onReturnToWelcome }) => {
  // Theme state with local persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('notenest_theme') || 'light';
  });

  // Notes data state
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Left Sidebar Navigation: 'home' | 'favorites' | 'trash'
  const [activeNav, setActiveNav] = useState('home');

  // Search & Category
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 250);
  const [activeCategory, setActiveCategory] = useState('All');

  // Sort State: newest | oldest | updated | title
  const [sortBy, setSortBy] = useState(() => {
    return localStorage.getItem('notenest_sort_by') || 'newest';
  });

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

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    localStorage.setItem('notenest_sort_by', newSort);
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
        const response = await notesApi.updateNote(editingNote._id, formData);
        if (response.success) {
          setNotes((prev) =>
            prev.map((n) => (n._id === editingNote._id ? response.data : n))
          );
          if (viewingNote && viewingNote._id === editingNote._id) {
            setViewingNote(response.data);
          }
          toast.success('Note updated successfully!');
          setIsFormOpen(false);
          setEditingNote(null);
        }
      } else {
        const response = await notesApi.createNote(formData);
        if (response.success) {
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
   * Handle Quick Note Color Theme Change
   */
  const handleUpdateColor = async (noteId, newColor) => {
    try {
      setNotes((prev) =>
        prev.map((n) => (n._id === noteId ? { ...n, color: newColor } : n))
      );
      if (viewingNote && viewingNote._id === noteId) {
        setViewingNote((prev) => ({ ...prev, color: newColor }));
      }

      const response = await notesApi.updateNote(noteId, { color: newColor });
      if (response.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === noteId ? response.data : n))
        );
        toast.success('Color updated', { icon: '🎨' });
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
      loadNotes(debouncedSearch);
    }
  };

  /**
   * Toggle Pin note status (📌)
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

  /**
   * Toggle Favorite note status (⭐)
   */
  const handleToggleFavorite = async (note) => {
    try {
      const newFavorite = !note.favorite;
      const response = await notesApi.updateNote(note._id, { favorite: newFavorite });
      if (response.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === note._id ? response.data : n))
        );
        toast.success(newFavorite ? 'Added to favorites' : 'Removed from favorites', {
          icon: newFavorite ? '⭐' : '☆',
        });
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  /**
   * Delete handler:
   * - In active notes (Home/Favorites): Moves note directly to Trash.
   * - In Trash section: Prompts user with dialog asking to Restore or Delete.
   */
  const handleTrashNote = async (note) => {
    if (activeNav === 'trash') {
      // In Trash section: open confirmation dialog asking like restore and delete button
      setDeletingNote(note);
    } else {
      // In Home/Favorites: move particular note directly to trash
      try {
        const response = await notesApi.updateNote(note._id, { trashed: true });
        if (response.success) {
          setNotes((prev) =>
            prev.map((n) => (n._id === note._id ? response.data : n))
          );
          toast.success('Note moved to Trash', { icon: '🗑️' });
        }
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    }
  };

  /**
   * Restore note from Trash
   */
  const handleRestoreNote = async (note) => {
    try {
      const response = await notesApi.updateNote(note._id, { trashed: false });
      if (response.success) {
        setNotes((prev) =>
          prev.map((n) => (n._id === note._id ? response.data : n))
        );
        toast.success('Note restored to active notes', { icon: '✨' });
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };


  /**
   * Confirm Note Permanent Deletion (removes record from database)
   */
  const handleConfirmPermanentDelete = async () => {
    if (!deletingNote) return;
    try {
      setIsDeleting(true);
      const response = await notesApi.deleteNote(deletingNote._id);
      if (response.success) {
        setNotes((prev) => prev.filter((n) => n._id !== deletingNote._id));
        if (viewingNote && viewingNote._id === deletingNote._id) {
          setViewingNote(null);
        }
        toast.success('Note permanently deleted!');
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
   * Export all notes as JSON backup file (Download icon in sidebar)
   */
  const handleExportNotes = () => {
    try {
      const exportData = JSON.stringify(notes, null, 2);
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `NotesApp_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Notes backup exported successfully!', { icon: '📥' });
    } catch (err) {
      toast.error('Failed to export notes.');
    }
  };

  // Compute navigation counts and category counts
  const { allCount, favoritesCount, trashCount, categoryCounts } = useMemo(() => {
    let all = 0;
    let favs = 0;
    let trash = 0;
    const catCounts = { All: 0, Study: 0, Work: 0, Ideas: 0, Personal: 0, General: 0 };

    notes.forEach((note) => {
      if (note.trashed) {
        trash += 1;
      } else {
        all += 1;
        catCounts.All += 1;

        if (note.favorite) favs += 1;

        const cat = note.category || 'General';
        if (catCounts[cat] !== undefined) {
          catCounts[cat] += 1;
        } else {
          const matched = Object.keys(catCounts).find(
            (k) => k.toLowerCase() === cat.toLowerCase()
          );
          if (matched) catCounts[matched] += 1;
        }
      }
    });

    return {
      allCount: all,
      favoritesCount: favs,
      trashCount: trash,
      categoryCounts: catCounts,
    };
  }, [notes]);

  // Filter and Sort displayed notes
  const displayedNotes = useMemo(() => {
    let filtered = notes;

    // 1. Filter by Sidebar Navigation Item
    if (activeNav === 'trash') {
      filtered = filtered.filter((n) => Boolean(n.trashed));
    } else if (activeNav === 'favorites') {
      filtered = filtered.filter((n) => !n.trashed && Boolean(n.favorite));
    } else {
      // 'all' notes
      filtered = filtered.filter((n) => !n.trashed);
    }

    // 2. Filter by Category
    if (activeCategory !== 'All' && activeNav !== 'trash') {
      filtered = filtered.filter(
        (n) => (n.category || 'General').toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // 3. Sort Notes
    return [...filtered].sort((a, b) => {
      // Pinned notes float to top in active views
      if (activeNav !== 'trash' && a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }

      if (sortBy === 'oldest') {
        return new Date(a.createdAt || a.updatedAt) - new Date(b.createdAt || b.updatedAt);
      }
      if (sortBy === 'updated') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      // Default: 'newest'
      return new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt);
    });
  }, [notes, activeNav, activeCategory, sortBy]);

  const navSectionTitle =
    activeNav === 'favorites'
      ? 'Favorites'
      : activeNav === 'trash'
      ? 'Trash'
      : searchQuery
      ? 'Search Results'
      : 'All Notes';

  return (
    <div className="app-layout-wrapper">
      {/* 3rd Image: Left Side Navigation Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onSelectNav={(nav) => setActiveNav(nav)}
        allCount={allCount}
        favoritesCount={favoritesCount}
        trashCount={trashCount}
        theme={theme}
        onToggleTheme={toggleTheme}
        onExportNotes={handleExportNotes}
        onReturnToWelcome={onReturnToWelcome}
      />

      {/* Main Workspace on the Right */}
      <div className="app-main-content">
        {/* Top Hero Banner matching user reference image (shown only on Home) */}
        {activeNav === 'home' && (
          <HeroBanner
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}

        <main className="dashboard-main">
          {/* Visual Category Carousel (only in active notes Home view) */}
          {activeNav === 'home' && (
            <CategoryCardList
              activeCategory={activeCategory}
              onSelectCategory={(catId) => setActiveCategory(catId)}
              counts={categoryCounts}
            />
          )}

          {/* Sub-header Toolbar */}
          <section className="dashboard-toolbar">
            <div className="toolbar-info">
              <h2 className="toolbar-title">{navSectionTitle}</h2>
              {activeNav === 'home' && (
                <span className="notes-count-badge" id="notes-counter">
                  {displayedNotes.length} {displayedNotes.length === 1 ? 'note' : 'notes'}
                </span>
              )}
            </div>

            {/* Integrated Toolbar Search on Home */}
            {activeNav === 'home' && (
              <div className="toolbar-search-pill">
                <Search size={15} className="toolbar-search-icon" />
                <input
                  type="text"
                  className="toolbar-search-input"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="toolbar-search-input"
                  aria-label="Search notes"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="toolbar-search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    &times;
                  </button>
                )}
              </div>
            )}

            {activeNav === 'home' && (
              <div className="toolbar-controls">
              {/* Sort Dropdown */}
              <div className="sort-control-container">
                <label htmlFor="sort-notes-select" className="sort-label">
                  <ArrowUpDown size={14} />
                  <span>Sort:</span>
                </label>
                <select
                  id="sort-notes-select"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  aria-label="Sort notes"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="updated">Recently Updated</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>

              {/* View Mode Toggle: Grid vs List */}
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

              {/* Add Note Button */}
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
            )}
          </section>

          {/* Content Area: Loading / Error / Empty / Pastel Cards Grid */}
          {isLoading ? (
            <LoadingSpinner message="Loading your notes..." size="lg" />
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
            ) : activeNav === 'trash' ? (
              <EmptyState
                type="trash"
                onAction={() => setActiveNav('home')}
              />
            ) : activeNav === 'favorites' ? (
              <EmptyState
                type="favorites"
                onAction={() => setActiveNav('home')}
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
            <div className={viewMode === 'list' ? 'pastel-notes-list' : 'pastel-notes-grid'} id="notes-container">
              {displayedNotes.map((note, idx) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  index={idx}
                  isTrashView={activeNav === 'trash'}
                  onView={(n) => setViewingNote(n)}
                  onEdit={(n) => {
                    setEditingNote(n);
                    setIsFormOpen(true);
                  }}
                  onDelete={handleTrashNote}
                  onRestore={handleRestoreNote}
                  onTogglePin={handleTogglePin}
                  onToggleFavorite={handleToggleFavorite}
                  onUpdateColor={handleUpdateColor}
                />
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            Notes App &bull; Built with React, Vite, Node.js, Express &amp; MongoDB
          </p>
        </footer>
      </div>

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
        onConfirm={handleConfirmPermanentDelete}
        onCancel={() => setDeletingNote(null)}
        confirmLabel="Delete"
        isConfirming={isDeleting}
      />
    </div>
  );
};

export default NotesPage;
