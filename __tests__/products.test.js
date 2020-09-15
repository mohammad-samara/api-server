'use strict';
require('@code-fellows/supergoose');

const products = require('../lib/models/products-collection');
let testObj = {
  'category': 'electronics',
  'name': 'televesion',
  'display_name': 'tv',
  'description': 'Best tv',
};

describe('products Model', () =>{
  it('can create() a products', ()=> {
    return products.create(testObj)
      .then(record => {
        //console.log(record);
        Object.keys(testObj).forEach(key=> {
          expect(record[key]).toEqual(testObj[key]);
        });
      });
  });

  it('can read() products', ()=> {
    return products.read()
      .then(results => {
        Object.keys(testObj).forEach(key=> {
          expect(results[0][key]).toEqual(testObj[key]);
        });
      });
  });
  
  it('can delete() products', ()=> {
    return products.delete()
      .then(results => {
        expect(results).toBeNull();

      });
  });
});