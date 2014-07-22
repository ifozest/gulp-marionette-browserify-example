var db = require('./initDB')
  , collection = db.collection('products')
  , Q = require('q');

var productDAO = {};
/**
 * fetch collection by options
 * @returns promise
 */
productDAO.fetch = function (options) {
  var deferred = new Q.defer();
  collection.find({name: new RegExp(options.filter)}, options).toArray(function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
};

/**
 * fetch count of products
 * @param options
 * @returns promise
 */
productDAO.count = function (options) {
  var deferred = new Q.defer();
  collection.count({name: new RegExp(options.filter)}, function (err, doc) {
    (doc) ? deferred.resolve(doc) : deferred.reject(err);
  });
  return deferred.promise;
};

module.exports = productDAO;