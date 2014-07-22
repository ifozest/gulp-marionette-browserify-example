var express = require('express')
  , router = express.Router()
  , productDAO = require('../db/productDAO')
  , Q = require('q');


/* GET products listing. */
router.get('/', function (req, res) {
  var options
    , result
    , filter = req.query.filter
    , from = +req.query.from
    , to = +req.query.to
    , sortField = req.query.sortField
    , sortOrder = +req.query.sortOrder;

  if ((!from || from < 0) || (!to || to < 0) || !sortField || !sortOrder || (from > to)) {
    res.send(500, 'error');
  }
  from--;
  options = {
    skip: from,
    limit: to - from,
    sort: {}
  };
  options.sort[sortField] = sortOrder;
  if (filter) {
    options.filter = filter;
  }


  Q.all([
      productDAO.fetch(options),
      productDAO.count(options)
    ]).spread(function (docs, allDocsCount) {
      result = {
        count: allDocsCount,
        products: docs
      };
      res.send(200, result);
    }).fail(function (err) {
      res.send(500, err);
    });
});

module.exports = router;
