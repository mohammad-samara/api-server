'use strict';
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  category: { type: String, required: true },  
  name: { type: String, required: true },
  display_name: { type: String},
  description: { type: String},
  price: {type: Number},
  inStock: {type : Number},
});

module.exports = mongoose.model('productSchema', productSchema);