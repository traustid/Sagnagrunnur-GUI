var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DataModel = require('./../models/DataModel');

module.exports = Backbone.Collection.extend({
	model: DataModel,
	urlBase: '/grunnur/api/persons',

	initialize: function(options) {
		this.options = options;
		if (this.options && this.options.fairyTales) {
			this.urlBase = '/grunnur/api/fairytales/informants'
		}
		this.metadata = new Backbone.Model();
	},

	parse: function(data) {
		return data.results ? data.results : data;
	},

	getPersons: function(page, searchQuery) {
		this.currentPage = page;

		if (searchQuery) {
			this.url = this.urlBase+'/search/name/'+searchQuery;
		}
		else {		
			this.url = this.urlBase+'/'+((this.currentPage-1)*200)+'/200';
		}

		this.fetch({
			reset: true
		});
	},

	byPlace: function(placeId) {
		this.url = this.urlBase+'/place/'+placeId;
		this.fetch({
			reset: true
		});
	}
});
