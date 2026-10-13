import axios from 'axios';

// Get API base URL from Vite environment variable with safe fallback
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create configured Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Extract user-friendly error message from Axios errors
 */
export const getErrorMessage = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  if (error.request) {
    return 'Unable to connect to NoteNest server. Please ensure the backend is running.';
  }
  return error.message || 'An unexpected error occurred.';
};

/**
 * Notes API service methods
 */
export const notesApi = {
  /**
   * Fetch all notes with optional search query
   * @param {string} search - Optional search string
   */
  async getNotes(search = '') {
    const params = {};
    if (search && search.trim() !== '') {
      params.search = search.trim();
    }
    const response = await apiClient.get('/notes', { params });
    return response.data;
  },

  /**
   * Fetch a single note by ID
   * @param {string} id - MongoDB Note ObjectId
   */
  async getNoteById(id) {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  },

  /**
   * Create a new note
   * @param {Object} noteData - { title, content, category, color, pinned }
   */
  async createNote(noteData) {
    const response = await apiClient.post('/notes', noteData);
    return response.data;
  },

  /**
   * Update an existing note
   * @param {string} id - MongoDB Note ObjectId
   * @param {Object} noteData - Fields to update
   */
  async updateNote(id, noteData) {
    const response = await apiClient.put(`/notes/${id}`, noteData);
    return response.data;
  },

  /**
   * Delete a note by ID
   * @param {string} id - MongoDB Note ObjectId
   */
  async deleteNote(id) {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
  },
};

export default notesApi;
