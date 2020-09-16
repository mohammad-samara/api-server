'use strict';

require('dotenv').config();
const express = require('express');
const timeStamp = require('../middleware/timestamp.js');
//const logger = require('../middleware/logger.js');  //used morgan instead
const middleNotFound = require('../middleware/404.js');
const middleError = require('../middleware/500.js');
// const productsRouter = require('../routes/products-router.js');//no longer used we use main-router
// const categoriesRouter = require('../routes/categories-router.js');//no longer used we use main-router
const apiRouter = require('../routes/main-router.js');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
/*let db = {
  'categories': [
    {
      '_id': '1',
      'name': 'blender',
      'display_name': 'blender',
      'description': 'to blend things like fruits',
    },
    {
      'name': 'fridges-medium',
      'display_name': 'medium fridge',
      'description': 'to store food',
      '_id': '2',
    },
    {
      'name': 'microwave-medium',
      'display_name': 'medium microwave',
      'description': 'to heat food',
      '_id': '7',
    },
  ],
  'products': [
    {
      '_id': '1',
      'category': 'blender',
      'name': 'panasonic blender-Model-A01',
      'display_name': 'panasonic blender',
      'description': 'the latest blender from panasonic',
    },
  ],
};
*/

// global middleware
app.use(express.json()); //body-parser to add body to the req
app.use(timeStamp); //set to run for all routes
//app.use(logger); //used morgan instead of it
app.use(morgan('dev'));
app.use(cors());

//Routers use
// app.use('/products', productsRouter);//no longer used
// app.use('/categories', categoriesRouter);//no longer used
app.get('/', (req, res) => {  //show some text at home page
  res.send('API SERVER APP');
});
app.use(apiRouter);
/*
/////////////////////////// Products routes

app.post('/products', (req, res) => {
  const data = {//undefined req.body if not parsed using(express.json)
    'category': `${req.body.category}`,
    'name': `${req.body.name}`,
    'display_name': `${req.body.display_name}`,
    'description': `${req.body.description}`,
    '_id': `${parseInt(db.products[db.products.length-1]._id) + 1}`,//get the latest item id then adds 1
  };
  //we can do this instead:
  // const { category,name,display_name,description } = req.body;
  //const data = { category,name,display_name,description };
  db.products.push(data);
  res.status(201).json(data);
});

app.get('/products', (req, res) => {
  const count = db.products.length;
  const results = db.products;
  const data = { count,results};
  res.status(200).json(data);
});

app.get('/products/:id', (req, res) => {
  const paramId = req.params.id;
  let products = getFromDb(paramId, db.products);
  console.log(products);
  console.log('-------------------');
  console.log({products});
  res.status(200).json({products});

});

app.put('/products/:id', (req, res) => {
  if(!req.body.category || !req.body.name || !req.body.display_name || !req.body.description){res.status(400).send('you must send category, name, display_name, and description');}else{
    const paramId = req.params.id;
    const data = {
      'category': `${req.body.category}`,
      'name': `${req.body.name}`,
      'display_name': `${req.body.display_name}`,
      'description': `${req.body.description}`,
      '_id': `${paramId}`,
    };

    let index = getIndexUsingId(paramId,db.products);
    db.products.splice(index, 1, data);//replace old record with new record without changing the index
    console.log('product db:',db.products);

    let products = getFromDb(paramId, db.products);
    console.log('product in the db',products);
    res.status(200).json({products});
  }
});

app.patch('/products/:id', (req, res) => {
  if(!req.body.category && !req.body.name && !req.body.display_name && !req.body.description){res.status(400).send('you must send category or name or display_name or and description');}else{
    const paramId = req.params.id;
    let oldProductInDb = getFromDb(paramId, db.products);
    const data = {
      'category': `${req.body.category || oldProductInDb.category}`,
      'name': `${req.body.name || oldProductInDb.name}`,
      'display_name': `${req.body.display_name || oldProductInDb.display_name}`,
      'description': `${req.body.description || oldProductInDb.description}`,
      '_id': `${paramId}`,
    };

    let index = getIndexUsingId(paramId,db.products);
    db.products.splice(index, 1, data);//replace old record with new record without changing the index
    console.log('product db:',db.products);

    let products = getFromDb(paramId, db.products);
    console.log('product in the db',products);
    res.status(200).json({products});
  }
});

app.delete('/products/:id', (req, res) => {
  const paramId = req.params.id;

  let index = getIndexUsingId(paramId,db.products);
  db.products.splice(index,1);
  res.status(200).send('product deleted!');
});


/////////////////////////////Categories routes

app.post('/categories', (req, res) => {
  const data = {
    'name': `${req.body.name}`,
    'display_name': `${req.body.display_name}`,
    'description': `${req.body.description}`,
    '_id': `${parseInt(db.categories[db.categories.length-1]._id) + 1}`,//get the latest item id then adds 1
  };
  db.categories.push(data);
  res.status(201).json(data); 
});

app.get('/categories', (req, res) => {
  const count = db.categories.length;
  const results = db.categories;
  const data = { count,results};
  res.status(200).json(data);
});

app.get('/categories/:id', (req, res) => {
  const paramId = req.params.id;
  
  let categories = getFromDb(paramId, db.categories);
  console.log(categories);
  res.status(200).json({categories});

});

app.put('/categories/:id', (req, res) => {
  if(!req.body.name || !req.body.display_name || !req.body.description){res.status(400).send('you must send name, display_name, and description');}else{
    const paramId = req.params.id;
    const data = {
      'name': `${req.body.name}`,
      'display_name': `${req.body.display_name}`,
      'description': `${req.body.description}`,
      '_id': `${paramId}`,
  
    };
    let index = getIndexUsingId(paramId,db.categories);
    db.categories.splice(index, 1, data);//replace old record with new record without changing the index
    console.log(db.categories);

    let categories = getFromDb(paramId, db.categories);
    console.log(categories);
    res.status(200).json({categories});
  }
});

app.patch('/categories/:id', (req, res) => {
  if(!req.body.name && !req.body.display_name && !req.body.description){res.status(400).send('you must send name, display_name, and description');}else{
    const paramId = req.params.id;
    let oldCategoryInDb = getFromDb(paramId, db.categories);
    const data = {
      'name': `${req.body.name || oldCategoryInDb.name}`,
      'display_name': `${req.body.display_name || oldCategoryInDb.display_name}`,
      'description': `${req.body.description || oldCategoryInDb.description}`,
      '_id': `${paramId}`,
  
    };
    let index = getIndexUsingId(paramId,db.categories);
    db.categories.splice(index, 1, data);//replace old record with new record without changing the index
    console.log(db.categories);

    let categories = getFromDb(paramId, db.categories);
    console.log(categories);
    res.status(200).json({categories});
  }
});

app.delete('/categories/:id', (req, res) => {
  const paramId = req.params.id;
  let index = getIndexUsingId(paramId,db.categories);
  console.log(index);
  db.categories.splice(index,1);
  res.status(200).send('product deleted!');
});
*/


// errors middleware
app.use('*', middleNotFound);
app.use(middleError);

/*
//functions
function getFromDb(id , field){
  let foundResult = field.filter((product)=>{
    return product._id==id;
  });
  return foundResult[0];
}
function getIndexUsingId(paramId,field){
  let stringIndex = field.findIndex((item)=>{
    return item._id == paramId;
  });
  return parseInt(stringIndex);
}
*/

module.exports = {
  server: app,// exporting this for testing puposes
  start: (port) => {// exporting this for index.js
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};