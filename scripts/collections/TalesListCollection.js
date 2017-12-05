var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DataModel = require('./../models/DataModel');

module.exports = Backbone.Collection.extend({
	model: DataModel,
	urlBase: '/grunnur/api/fairytales',

	initialize: function(options) {
		this.metadata = new Backbone.Model();
	},

	parse: function(data) {
		if (data.tag && data.count) {
			this.metadata.set({
				tag: data.tag,
				count: data.count,
				id: data.id
			});
		}
		else {
			this.metadata.clear();
		}
		
		return data.legends ? data.legends : data;
	},

	search: function(query) {
		this.searchQuery = query;
		this.url = this.urlBase+'/search/'+query;

		this.fetch({
			reset: true
		});
	},

	getPage: function(page) {
		this.currentPage = page;
		this.url = this.urlBase+'/'+((this.currentPage-1)*200)+'/200';
		this.fetch({
			reset: true
		});
	},

	talesByAtNumber: function(atNumber) {
		this.url = this.urlBase+'/at/'+atNumber;
		this.fetch({
			reset: true
		});
	},

	talesByCategory: function(category) {
		this.url = this.urlBase+'/category/'+category;
		this.fetch({
			reset: true
		});
	},

	byKeyword: function(keyword) {
		this.url = this.urlBase+'/tag/'+keyword;
		this.fetch({
			reset: true
		});
	}
});