var Backbone = require('backbone')
  , template = require('./../../../templates/pagination/header');

module.exports = Backbone.View.extend({
  events: {
    'change #productsOnPage': 'changeProductsOnPage'
  },
  render: function () {
    var options = this.model.toJSON()
      , number = options.to - options.from + 1;
    this.$el.append(template({number: number}));
    return this;
  },
  changeProductsOnPage: function (e) {
    var number = +e.target.value;
    if (isNaN(number) || !(parseInt(Number(number)) == number) || number <= 0) {
      e.target.value = 1;
    } else {
      this.model.setNumberOnPage(number);
      this.trigger('refreshProducts');
    }
  }
});