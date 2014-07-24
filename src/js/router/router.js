var Backbone = require('backbone')
  , AppView = require('./../view/appView');


module.exports = Backbone.Router.extend({
  routes: {
    '': 'default'
  },
  default: function () {
    new AppView({
      el: '#container'
    }).renderApp();
  }
});
