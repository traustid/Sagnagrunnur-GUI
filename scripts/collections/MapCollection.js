var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var RouteParser = require('route-parser');

var DataModel = require('./../models/DataModel');

module.exports = Backbone.Collection.extend({
	model: DataModel,
	urlBase: '/grunnur/api/locations/v2',

	initialize: function(options) {
		this.options = options;
	},

	getPlaces: function(mapType, params) {
		if (mapType == 'legends') {
			var route = new RouteParser(this.options.router.routeStrings.mapLegends);

			this.url = this.urlBase+(route.reverse(params).replace('map', ''));
			this.fetch({
				reset: true
			});
		}
	},

	parse: function(data) {
		return data.data;
	}
});
