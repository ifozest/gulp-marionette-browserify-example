var Backbone = require('backbone')
  , template = require('./../../templates/appView')
  , $ = require('jquery')
  , Paginator = require('./../model/paginator')
  , Products = require('./../model/products')
  , productsRepository = require('./../controller/productsRepository')
  , ProductsCollectionView = require('./product/productsCollection')
  , PaginationHeader = require('./../view/pagination/header')
  , PaginationArrows = require('./../view/pagination/arrows')
  , PaginationFooter = require('./../view/pagination/footer');

module.exports = Backbone.View.extend({
  initialize: function () {
    this.paginator = new Paginator();
    this.sortProperty = 'name';
  },
  events: {
    'click .sortable': 'sortCollection'
  },
  render: function () {
    this.$el.append(template());
  },
  renderApp: function () {
    var self = this;

    self.render();
    $.when(productsRepository.fetchProducts(self.paginator.toJSON())).done(function (data) {
      self.paginator.set({all: data.count});
      self.renderPaginationHeader();
      self.renderProducts(data);
      self.renderPaginationFooter();
      self.renderPaginationArrows();

    }).fail(function (err) {
        console.log(err);
        alert('there are some obstacles to retrieving data from the server');
      });
  },
  reRenderProducts: function () {
    var self = this
      , params = self.paginator.toJSON();
    this.productsView.$el.empty();

    $.when(productsRepository.fetchProducts(params)).done(function (data) {
      self.paginator.set({all: data.count});
      self.paginator.trigger('pagination');
      self.renderProducts(data);
    }).fail(function (err) {
        console.log(err);
        alert('there are some obstacles to retrieving data from the server');
      });
  },
  renderProducts: function (data) {
    this.products = new Products(data.products);
    this.products.sort(this.sortProperty);
    this.productsView = new ProductsCollectionView({
      collection: this.products,
      el: 'tbody'
    });
    this.productsView.render();
  },
  renderPaginationHeader: function () {
    this.pgHeader = new PaginationHeader({
      model: this.paginator,
      el: '#paginationHeader'
    });
    this.pgHeader.render();
    this.listenTo(this.pgHeader, 'refreshProducts', this.reRenderProducts);
  },
  renderPaginationFooter: function () {
    this.pgFooter = new PaginationFooter({
      model: this.paginator,
      el: '#paginationFooter'
    });
    this.pgFooter.render();
  },
  renderPaginationArrows: function () {
    this.pgArrows = new PaginationArrows({
      model: this.paginator,
      el: '#paginationArrows'
    });
    this.pgArrows.render();
    this.listenTo(this.pgArrows, 'refreshProducts', this.reRenderProducts);
  },
  sortCollection: function (e) {
    var property = e.target.id
      , sortClass;
    this.sortProperty = this.products.sort(property);
    $('.sortable').removeClass('sort-asc sort-desc');
    sortClass = (this.sortProperty.charAt(0) !== '-') ? 'sort-asc' : 'sort-desc';
    $(e.target).addClass(sortClass);
    this.products.trigger('sort');
  }
});