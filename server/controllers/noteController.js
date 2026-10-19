const mongoose = require('mongoose');
const Note = require('../models/Note');

/**
 * Helper to escape special regex characters for safe search
 */
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * @desc    Get all notes (with optional case-insensitive search and updatedAt sort)
 * @route   GET /api/notes
 * @access  Public
 */
const getNotes = async (req, res, next) => {
  try {
    const { search, archived } = req.query;
    const filter = {};

    if (search && search.trim() !== '') {
      const sanitized = escapeRegex(search.trim());
      const regex = new RegExp(sanitized, 'i');
      filter.$or = [{ title: regex }, { content: regex }, { category: regex }];
    }

    if (archived === 'true') {
      filter.archived = true;
    } else if (archived === 'false') {
      filter.archived = { $ne: true };
    }

    // Default sorting: most recently updated notes first
    const notes = await Note.find(filter).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single note by ID
 * @route   GET /api/notes/:id
 * @access  Public
 */
const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Note ID format',
      });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: `Note not found with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new note
 * @route   POST /api/notes
 * @access  Public
 */
const createNote = async (req, res, next) => {
  try {
    const { title, content, category, color, pinned, archived, favorite, trashed } = req.body;

    // Validate presence and trimmed content
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Note title is required and cannot be blank',
      });
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Note content is required and cannot be blank',
      });
    }

    const newNote = await Note.create({
      title: title.trim(),
      content: content.trim(),
      category: category ? category.trim() : 'General',
      color: color || '#ffffff',
      pinned: typeof pinned === 'boolean' ? pinned : false,
      archived: typeof archived === 'boolean' ? archived : false,
      favorite: typeof favorite === 'boolean' ? favorite : false,
      trashed: typeof trashed === 'boolean' ? trashed : false,
    });

    return res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: newNote,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing note
 * @route   PUT /api/notes/:id
 * @access  Public
 */
const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Note ID format',
      });
    }

    const { title, content, category, color, pinned, archived, favorite, trashed } = req.body;

    // Build update payload
    const updates = {};

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Note title cannot be empty or blank',
        });
      }
      updates.title = title.trim();
    }

    if (content !== undefined) {
      if (typeof content !== 'string' || content.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Note content cannot be empty or blank',
        });
      }
      updates.content = content.trim();
    }

    if (category !== undefined) {
      updates.category = typeof category === 'string' && category.trim() !== '' ? category.trim() : 'General';
    }

    if (color !== undefined) {
      updates.color = color;
    }

    if (pinned !== undefined) {
      updates.pinned = Boolean(pinned);
    }

    if (archived !== undefined) {
      updates.archived = Boolean(archived);
    }

    if (favorite !== undefined) {
      updates.favorite = Boolean(favorite);
    }

    if (trashed !== undefined) {
      updates.trashed = Boolean(trashed);
    }

    // Find and update; runValidators ensures schema constraints; timestamps will update updatedAt
    const updatedNote = await Note.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: `Note not found with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a note
 * @route   DELETE /api/notes/:id
 * @access  Public
 */
const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Note ID format',
      });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: `Note not found with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: { id: deletedNote._id },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
