var Backbone = require('backbone')
  , _ = require('underscore');

module.exports = Backbone.Model.extend({
  defaults: {
    name: '',
    category: '',
    releaseDate: '',
    price: ''
  },
  //Override for save releaseDate as Date object
  set: function (key, val, options) {
    var object = Backbone.Model.prototype.set.call(this, key, val, options);
    if (key.releaseDate) {
      if (!_.isDate(key.releaseDate)) {
        object.set({releaseDate: new Date(key.releaseDate)});
      }
    }
    return object;
  }
});