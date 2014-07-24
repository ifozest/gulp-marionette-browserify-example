var Backbone = require('backbone')
  , template = require('./../../../templates/pagination/arrows');

module.exports = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'pagination', this.reRender);
  },
  events: {
    'click .arrow.active': 'changeProductsOnPage'
  },
  render: function(){
    var options = this.model.toJSON();
    var classes = {
      left: (options.from > 1) ? 'active' : 'disabled',
      right: (options.to < options.all) ? 'active' : 'disabled'
    };
    this.$el.append(template(classes));
    return this;
  },
  changeProductsOnPage: function(e){
    var direction = (e.target.className.match(/right-arrow/)) ? 1 : -1;
    this.model.goNextPage(direction);
    this.trigger('refreshProducts');
  },
  reRender: function(){
    this.$el.empty();
    this.render();
  }
});