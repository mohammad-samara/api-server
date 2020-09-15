'use strict';
const express = require('express');
const productsModel = require('../lib/models/products-collection.js');
const router = express.Router();

router.post('/', postProducts);
router.get('/', getProducts);
router.get('/:_id', getOneProduct);
router.put('/:_id', updateProduct);
router.delete('/:_id', deleteProduct);
router.patch('/:_id', patchProduct);


function postProducts(req, res, next) {
  productsModel
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}

function getProducts(req,res,next){
  productsModel
    .read()
    .then((data) => {
      const count = data.length;
      const results = data;
      const allData = { count,results};
      res.json(allData);
    })
    .catch(next);
    
}

function getOneProduct(req,res,next){
  productsModel
    .read(req.params._id)
    .then((data) =>res.json(data))
    .catch(next);
}

function updateProduct(req,res,next){
  productsModel
    .update(req.params._id , req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(next);    
}

function patchProduct(req,res,next){
  productsModel
    .patch(req.params._id , req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(next);    
}

function deleteProduct(req,res,next){
  productsModel
    .delete(req.params._id)
    .then((data) => res.send(`_id: ${req.params._id} deleted!`))
    .catch(next);  
}

module.exports = router;