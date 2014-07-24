var $ = require('jquery');

module.exports = {
  fetchProducts: function(params){
    var options = {
      url: 'backend',
      data: params
    };
    return $.ajax(options);
  }
};