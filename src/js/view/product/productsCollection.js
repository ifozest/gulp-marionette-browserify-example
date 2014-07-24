var Backbone = require('backbone')
  , _ = require('underscore')
  , ProductView = require('./product');

module.exports = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'sort', this.reRender);
  },
  render: function(){
    var collection = this.collection;
    if (_.isUndefined(collection) || _.isNull(collection) || _.isEmpty(collection)){
      this.renderEmptyCollection();
    } else {
      this.collection.each(function (product) {
        this.renderProduct(product);
      }, this);
    }
    return this;
  },
  renderProduct: function(product){
    var productView = new ProductView({
      model: product
    });
    this.$el.append(productView.render().$el);
  },
  renderEmptyCollection: function(){
    this.$el.append('lol');
  },
  reRender: function(){
    this.$el.empty();
    this.render();
  }

});