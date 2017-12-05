var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var PlaceListCollection = require('./../collections/PlaceListCollection');
var DataListView = require('./DataListView');

module.exports = DataListView.extend({
	uiTemplateName: 'placeListViewTemplate',

	initialize: function(options) {
		this.options = options;

		this.collection = new PlaceListCollection();
		this.collection.on('reset', this.render, this);
		this.collection.metadata.on('change', this.updateMetadata, this);

		this.renderUI();

		this.on('search', _.bind(function(event) {
			this.options.router.navigate('/places/search/'+event.query, {
				trigger: true
			});
		}, this));
	},

	updateMetadata: function() {
		if (this.collection.metadata.get('page') != undefined) {
			this.$el.find('.page-info').html((Number(this.collection.metadata.get('page'))+200)+' / '+this.collection.metadata.get('total'));
		}
	},

	render: function() {

		this.renderList();

		return this;
	},

	renderList: function() {
		var template = _.template($("#placeListTemplate").html());
		this.$el.find('.list-container').html(template({
			models: this.collection.models
		}));		
	}
});