'use strict';
const cartSchema = require('./cart-schema.js');
const Model = require('./mongo.js');

class Cart extends Model {
  constructor() {
    super(cartSchema);
  }
}

module.exports = new Cart();