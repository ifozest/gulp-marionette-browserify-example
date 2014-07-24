var $ = require('jquery')
  , Backbone = require('backbone');
Backbone.$ = $; //fix

var Router = require('./router/router');

new Router();
Backbone.history.start();

