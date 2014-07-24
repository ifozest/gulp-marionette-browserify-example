var Backbone = require('backbone')
  , Product = require('./product');

module.exports = Backbone.Collection.extend({
  model: Product,
  sort: function (property) {
    var sortBy = property;
    if (this.sorted === property) {
      sortBy = '-' + property;
    }
    this.models.sort(this.dynamicSort(sortBy));
    this.sorted = sortBy;
    return sortBy;
  },
  dynamicSort: function (property) {
    var sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var f = a.attributes[property],
        s = b.attributes[property];
      var result = (f < s) ? -1 : (f > s) ? 1 : 0;
      return result * sortOrder;
    };
  }
});