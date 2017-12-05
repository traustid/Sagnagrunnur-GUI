var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet');

var DataView = require('./DataView');
var LegendModel = require('./../models/LegendModel');
var MapView = require('./MapView');

module.exports = DataView.extend({
	initialize: function(options) {
		this.options = options;

		this.model = new LegendModel();
		this.model.once('change', this.render, this);
		this.model.url = (window.sgBaseUrl ? window.sgBaseUrl : '')+'/grunnur/api/legend/'+this.options.legendId;
		this.model.fetch();
	},

	getLegend: function(id) {
		this.options.legendId = id;
		this.model.clear();
		this.model.once('change', this.render, this);
		this.model.url = (window.sgBaseUrl ? window.sgBaseUrl : '')+'/grunnur/api/legend/'+this.options.legendId;
		this.model.fetch();
	},

	render: function() {
		var template = _.template($("#legendViewTemplate").html());

		this.$el.html(template({
			model: this.model
		}));

		if (this.$el.find('.map-container').length > 0) {

			this.mapView = new MapView({
				el: this.$el.find('.map-wrapper'),
				popupTemplate: '<p><strong><%= model.get("name") %></strong></p><a href="#place/<%= model.get("id") %>">Sjá nánar</a></p>'
			});

			_.each(this.model.get('places'), _.bind(function(place) {
				if (place.coordinates.length > 0) {
					L.marker(place.coordinates).addTo(this.mapView.map).bindPopup('<p><strong>'+place.name+'</strong></p><p><a href="#place/'+place.id+'">Sjá nánar</a></p>');
				}
			}, this));

			this.mapView.map.fitBounds(_.map(_.filter(this.model.get('places'), function(place) {
				return place.coordinates.length > 0;
			}), function(place) {
				return place.coordinates;
			}), {
				maxZoom: 9
			});
		}

		return this;
	},

	destroy: function() {
		DataView.prototype.destroy.call(this);
	}
});
