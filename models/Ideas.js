const { text } = require('express');
const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema(
    { 
      text: {
        type: String,
        required: true,
        },

      tag: {
            type: String
        },

      description: {
            type: String,
        },

      username: {
            type: String,
        },
      date: {
            type: Date,
            default: Date.now
      }
    }
)

module.exports = mongoose.model('idea', IdeaSchema);