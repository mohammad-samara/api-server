'use strict';

module.exports = (req, res, next) => {
  console.log('Request', req.method, req.path , req.requestTime);
  next();
};