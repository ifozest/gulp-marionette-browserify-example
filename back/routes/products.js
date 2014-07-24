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
    , to = +req.query.to;

  //dirty check
  if ((!from || from < 0) || (!to || to < 0) || (from > to)) {
    res.send(400, 'error');
  }
  from--;
  options = {
    skip: from,
    limit: to - from
  };
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
      res.send(400, 'no data');
    });
});

module.exports = router;
