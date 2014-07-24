var Backbone = require('backbone')
  , template = require('./../../../templates/pagination/footer');

module.exports = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'pagination', this.reRender);
  },
  render: function () {
    var options = this.model.toJSON();
    options.to = (options.to > options.all) ? options.all : options.to;
    this.$el.append(template(options));
    return this;
  },
  reRender: function () {
    this.$el.empty();
    this.render();
    return this;
  }
});