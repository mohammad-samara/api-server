'use strict';
const express = require('express');
const categoriesModel = require('../lib/models/categories-collection.js');
const router = express.Router();

router.post('/', postCategories);
router.get('/', getCategories);
router.get('/:_id', getOneCategory);
router.put('/:_id', updateCategory);
router.delete('/:_id', deleteCategory);
router.patch('/:_id', patchCategory);

function postCategories(req, res, next) {
  categoriesModel
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}

function getCategories(req,res,next){
  categoriesModel
    .read()
    .then((data) => {
      const count = data.length;
      const results = data;
      const allData = { count,results};
      res.json(allData);
    })
    .catch(next);
}

function getOneCategory(req,res,next){
  categoriesModel
    .read(req.params._id)
    .then((data) => res.json(data))
    .catch(next);
}

function updateCategory(req,res,next){
  categoriesModel
    .update(req.params._id , req.body)
    .then((data) => res.json(data))
    .catch(next);    
}

function patchCategory(req,res,next){
  categoriesModel
    .patch(req.params._id , req.body)
    .then((data) => res.json(data))
    .catch(next);    
}

function deleteCategory(req,res,next){
  categoriesModel
    .delete(req.params._id)
    .then((data) => res.send(`_id: ${req.params._id} deleted!`))
    .catch(next);  
}

module.exports = router;