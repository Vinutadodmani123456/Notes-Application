const mongoose = require('mongoose');

/**
 * Note Schema
 * Represents a user's note with title, content, and automatic timestamps.
 */
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    content: {
      type: String,
      required: [true, 'Note content is required'],
      trim: true,
      maxlength: [10000, 'Content cannot exceed 10,000 characters'],
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
      maxlength: [30, 'Category cannot exceed 30 characters'],
    },
    color: {
      type: String,
      default: '#ffffff',
    },
    archived: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    trashed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Text index to accelerate search across both title and content
noteSchema.index({ title: 'text', content: 'text' });
// Index on updatedAt for default sorting order
noteSchema.index({ updatedAt: -1 });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
