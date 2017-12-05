var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var PersonListCollection = require('./../collections/PersonListCollection');
var DataListView = require('./DataListView');

module.exports = DataListView.extend({
	uiTemplateName: 'personListViewTemplate',

	initialize: function(options) {
		this.options = options;

		this.collection = new PersonListCollection();
		this.collection.on('reset', this.render, this);
		this.collection.metadata.on('change', this.updateMetadata, this);

		if (this.options.placeId != undefined) {
			this.collection.byPlace(this.options.placeId);
		}

		if (this.options.renderUI != undefined) {
			if (this.options.renderUI != false) {
				this.renderUI();
			}
		}
		else {
			this.renderUI();
		}

		this.on('search', _.bind(function(event) {
			this.options.router.navigate('/persons/search/'+event.query, {
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
		if (this.options.route) {
			if (this.collection.searchQuery != '') {
				this.options.router.navigate('/persons/search/'+this.collection.searchQuery);
			}
			else {
				this.options.router.navigate('/persons/'+this.collection.currentPage);
			}
		}

		this.renderList();

		return this;
	},

	renderList: function() {

		var template = _.template($("#personListTemplate").html());

		this.$el.find('.list-container').html(template({
			models: this.collection.models,
			fairyTales: false
		}));			
	}
});