var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet.markercluster');

var MapCollection = require('./../collections/MapCollection');
var MapView = require('./MapView');

var DataListView = require('./DataListView');

var DataCollection = require('./../collections/DataCollection');

var mapHelper = require('./../utils/MapHelper.js');

module.exports = DataListView.extend({
	uiTemplateName: 'mapViewTemplate',

	initialize: function(options) {
		this.options = options;

		this.collection = new MapCollection({
			router: this.options.router
		});

		this.collection.on('reset', this.render, this);

		if (!this.options.disableUIRender) {
			this.renderUI();
		}

		this.renderMap();
	},

	renderMap: function() {
		this.mapView = new MapView({
			el: this.$el.find('.map-wrapper'),
			viewModesUi: true,
			mapSizeUi: this.options.mapSizeUi,
			popupTemplate: '<p><strong><%= model.get("name") %></strong></p><a href="#place/<%= model.get("id") %>">Sjá nánar</a></p>'
		});
	},

	getPlaces: function(mapType, params) {
		this.$el.find('.map-wrapper').addClass('loading');

		this.collection.getPlaces(mapType, params);
	},

	clearMap: function() {
		if (this.mapView.collection) {
			this.mapView.collection.reset();
		}
	},

	render: function() {
		this.$el.find('.map-wrapper').removeClass('loading');

		this.mapView.addData(this.collection.toJSON());

		this.$el.find('.place-number').html(this.collection.length+' staðir fundust');

		this.trigger('render');
	}
});