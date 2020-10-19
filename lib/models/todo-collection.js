'use strict';
const todoSchema = require('./todo-schema.js');
const Model = require('./mongo.js');

class Todo extends Model {
  constructor() {
    super(todoSchema);
  }
}

module.exports = new Todo();