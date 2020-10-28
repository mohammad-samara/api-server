'use strict';

const categoriesModel = require('../lib/models/categories-collection.js');
const productsModel = require('../lib/models/products-collection.js');
const todoModel = require('../lib/models/todo-collection.js');
const cartModel = require('../lib/models/cart-collection');

/**
 * (Middleware) will select the correct model for the requested route
 * @module getModel
 */

/**
* Input 
* @function getModel
* @param req - request
* @param res  - response
* @param next - next
*/

function getModel(req, res, next) {
  const model = req.params.model; 
  switch (model) {
  case 'categories':
    req.model = categoriesModel;
    next();
    return;
  case 'products':
    req.model = productsModel;
    next();
    return;
  case 'todo':
    req.model = todoModel;
    next();
    return;
  case 'cart':
    req.model = cartModel;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}


module.exports = getModel;
