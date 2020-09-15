
'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../lib/server');
const mockRequest = supergoose(server);

describe('Server API', ()=> {
    
  it('should respond properly /products', ()=> {
    return mockRequest
      .get('/products')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('can get() a product item', async ()=> {
    const productObj = {category : 'electronics',name: 'phone', display_name : 'phone', description: 'to call people'};
    const data = await mockRequest.post('/products').send(productObj);
    //console.log('data.body : ',data.body);
    const record = data.body;
    const producttemResponse = await mockRequest.get(`/products/${record._id}`);
    const productItem = producttemResponse.body[0];
    Object.keys(productObj).forEach(key=> {
      expect(productItem[key]).toEqual(productObj[key]);
    });

  });

  it('can post() a product item', async ()=> {
    const productObj = {category : 'electronics',name: 'televesion', display_name : 'tv', description: 'to watch movies'};
    const data = await mockRequest.post('/products').send(productObj);
    //console.log('data.body : ',data.body);
    const record = data.body;
    Object.keys(productObj).forEach(key=> {
      expect(record[key]).toEqual(productObj[key]);
    });
  });

  it('TEST post() server failure ', ()=> {
    let obj = {name: 'test-post-1'};
    return mockRequest
      .post('/products')
      .send(obj)
      .then(data => {
        // compare what the post has returned with hwat we submitted
        // console.log(data.body);
        expect(data.status).toBe(500);
      });
  });

  it('TEST post() not found ', ()=> {
    let obj = {  'category': 'done',
      'name': 'abdallah',
      'display_name': '****',
      'description': 'Best one in the neighbourhood'};
    return mockRequest
      .post('/products/notFound')
      .send(obj)
      .then(data => {
        // compare what the post has returned with hwat we submitted
        // console.log(data.body);
        expect(data.status).toBe(404);
      });
  });


  





  it('should respond properly /categories', ()=> {
    return mockRequest
      .get('/categories')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('can get() a categories item', async ()=> {
    const categorytObj = {name: 'electronics', display_name : 'smart electrinics', description: 'using electricity to work'};
    const data = await mockRequest.post('/categories').send(categorytObj);
    //console.log('data.body : ',data.body);
    const record = data.body;
    const categoryItemResponse = await mockRequest.get(`/categories/${record._id}`);
    const categoryItem = categoryItemResponse.body[0];
    Object.keys(categorytObj).forEach(key=> {
      expect(categoryItem[key]).toEqual(categorytObj[key]);
    });

  });

  it('can post() a category item', async ()=> {
    const categorytObj = {name: 'electronics', display_name : 'smart electrinics', description: 'using electricity to work'};
    const data = await mockRequest.post('/categories').send(categorytObj);
    //console.log('data.body : ',data.body);
    const record = data.body;
    Object.keys(categorytObj).forEach(key=> {
      expect(record[key]).toEqual(categorytObj[key]);
    });
  });

  it('TEST post() server failure ', ()=> {
    let obj = {name: 'test-post-1'};
    return mockRequest
      .post('/categories')
      .send(obj)
      .then(data => {
        // compare what the post has returned with hwat we submitted
        // console.log(data.body);
        expect(data.status).toBe(500);
      });
  });

  it('TEST post() not found ', ()=> {
    let obj = {  'category': 'accessories',
      'name': 'hanger',
      'display_name': 'hanger',
      'description': 'to hang things'};
    return mockRequest
      .post('/categories/best/zzz')
      .send(obj)
      .then(data => {
        // compare what the post has returned with hwat we submitted
        // console.log(data.body);
        expect(data.status).toBe(404);
      });
  });  

        


});