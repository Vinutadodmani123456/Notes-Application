const express = require('express');
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');

// /api/notes
router.route('/')
  .get(getNotes)
  .post(createNote);

// /api/notes/:id
router.route('/:id')
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
