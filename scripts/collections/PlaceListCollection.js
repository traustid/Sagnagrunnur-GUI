var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.Collection.extend({
	urlBase: '/grunnur/api/places',

	initialize: function() {
		this.metadata = new Backbone.Model();
	},

	getPlaces: function(page, searchQuery) {
		this.currentPage = page;

		if (searchQuery) {
			this.url = this.urlBase+'/search/'+searchQuery;
		}
		else {		
			this.url = this.urlBase+'/'+((this.currentPage-1)*200)+'/200';
		}

		this.fetch({
			reset: true
		});
	},

	getPlacesByCounty: function(county) {
		this.url = this.urlBase+'/county/'+county;
		this.fetch({
			reset: true
		});
	},

	getPlacesByMunicipality: function(municipality) {
		this.url = this.urlBase+'/municipality/'+municipality;
		this.fetch({
			reset: true
		});
	}
});