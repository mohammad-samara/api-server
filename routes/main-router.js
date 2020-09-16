'use strict';
const express = require('express');
// const productsModel = require('../lib/models/products-collection.js');//moved to params.js in middleware folder
// const categoriesModel = require('../lib/models/categories-collection.js');//moved to params.js in middleware folder
const getModel = require('../middleware/params.js');
const router = express.Router();

router.param('model', getModel);
/* //moved to params.js in middleware folder
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
  default:
    next('invalid model');
    return;
  }
}
*/

router.post('/:model', postHandler);
router.get('/:model', getAllHandler);
router.get('/:model/:_id', getOneHandler);
router.put('/:model/:_id', updateHandler);
router.patch('/:model/:_id', patchHandler);
router.delete('/:model/:_id', deleteHandler);

/**
 * Post function
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function postHandler(req, res, next) {
  req.model
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}
 
/**
 * get all records from db
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function getAllHandler(req,res,next){
  req.model
    .read()
    .then((data) => {
      const count = data.length;
      const results = data;
      const allData = { count,results};
      res.json(allData);
    })
    .catch(next);
      
}
/**
 * get one record by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */  
function getOneHandler(req,res,next){
  req.model
    .read(req.params._id)
    .then((data) =>res.json(data))
    .catch(next);
}

/**
 * (put)replace the whole record in db by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function updateHandler(req,res,next){
  req.model
    .update(req.params._id , req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(next);    
}

/**
 * (patch)update one record in db by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function patchHandler(req,res,next){
  req.model
    .patch(req.params._id , req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(next);    
}

/**
 * delete one record from db by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function deleteHandler(req,res,next){
  req.model
    .delete(req.params._id)
    .then((data) => res.send(`_id: ${req.params._id} deleted!`))
    .catch(next);  
}

module.exports = router;
