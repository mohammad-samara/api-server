'use strict';
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  complete: { type: Boolean, required: true },  
  text: { type: String, required: true },
  difficulty: { type: Number, required: true },
  assignee: { type: String, required: true },
});

module.exports = mongoose.model('todoSchema', todoSchema);