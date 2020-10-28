'use strict';
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  category: { type: String},  
  name: { type: String, required: true },
  count: {type: Number},
});

module.exports = mongoose.model('cartSchema', cartSchema);