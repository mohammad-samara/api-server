'use strict';

require('@code-fellows/supergoose');

const categories = require('../lib/models/categories-collection');

let testObj = {
  'name': 'electronics',
  'display_name': 'smart electronics',
  'description': 'Best electronics',
};

describe('Categories Model', () =>{
  it('can create() a categories', ()=> {
    return categories.create(testObj)
      .then(record => {
        Object.keys(testObj).forEach(key=> {
          expect(record[key]).toEqual(testObj[key]);
        });
      });
  });

  it('can read() categories', ()=> {
    return categories.read()
      .then(results => {
        Object.keys(testObj).forEach(key=> {
          expect(results[0][key]).toEqual(testObj[key]);
        });
      });
  });
  
  it('can delete() categories', ()=> {
    return categories.delete()
      .then(results => {
        expect(results).toBeNull();
      });
  });
});