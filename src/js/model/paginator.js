var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    from: 1,
    to: 10,
    number: 10
  },
  setNumberOnPage: function (count) {
    var params = this.toJSON();
    if (count > params.all) {
      this.set({number: count, from: 1, to: params.all});
    } else if (count > 0) {
      this.set({number: count, to: params.from + count - 1});
    }
    this.trigger('pagination');
  },
  goNextPage: function (direction) {
    var to = this.get('to')
      , from = this.get('from')
      , all = this.get('all')
      , diff = this.get('number');
    if (direction === 1) {
      to = (to + diff > all) ? all : to + diff;
      from += diff;
    } else if (direction === -1) {
      from = (from - diff < 1) ? 1 : from - diff;
      to = from + diff - 1;
    }
    this.set({from: from, to: to});
    this.trigger('pagination');
  }
});