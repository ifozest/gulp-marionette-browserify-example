var Backbone = require('backbone')
  , template = require('./../../../templates/product/product');

module.exports = Backbone.View.extend({
  tagName: 'tr',
  className: '',
  render: function(){
    this.$el.append(template(this.model.toJSON()));
    return this;
  }
});