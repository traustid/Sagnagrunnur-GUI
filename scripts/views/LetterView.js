var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet');

var DataView = require('./DataView');
var DataModel = require('./../models/DataModel');
var MapView = require('./MapView');

var mapHelper = require('./../utils/MapHelper.js');

module.exports = DataView.extend({
	initialize: function(options) {
		this.options = options;

		this.model = new DataModel();
		this.model.once('change', this.render, this);
		this.model.on('sync', this.modelSaved, this);
		this.model.url = (window.sgBaseUrl ? window.sgBaseUrl : '')+'/grunnur/api/letter/'+this.options.letterId;
		this.model.fetch();
	},

	getPerson: function(personId) {
		this.options.personId = personId;
		this.model.clear();
		this.model.once('change', this.render, this);
		this.model.url = '/grunnur/api/letter/'+personId;
		this.model.fetch();
	},

	render: function() {
		var template = _.template($("#letterViewTemplate").html());

		this.$el.html(template({
			model: this.model
		}));

		this.mapView = new MapView({
			el: this.$el.find('.map-wrapper')
		});

		L.marker(this.model.get('dispatchplace').coordinates, {
				icon: mapHelper.smallIconOrange
			}).addTo(this.mapView.map).bindPopup(
				'<p><strong>'+this.model.get('sender').name+'</strong><br/>'+
				this.model.formatDate(this.model.get('date'))+'<br/>'+
				this.model.get('dispatchplace').name+'</p>'+
				'<p><a href="#person/'+this.model.get('sender').id+'">Sjá nánar</a></p>'
			);
		L.marker(this.model.get('destinationplace').coordinates, {
				icon: mapHelper.smallIconBlue
			}).addTo(this.mapView.map).bindPopup(
				'<p><strong>'+this.model.get('receiver').name+'</strong><br/>'+
				this.model.formatDate(this.model.get('date'))+'<br/>'+
				this.model.get('destinationplace').name+'</p>'+
				'<p><a href="#person/'+this.model.get('receiver').id+'">Sjá nánar</a></p>'
			);
		L.polyline([L.latLng(this.model.get('dispatchplace').coordinates), L.latLng(this.model.get('destinationplace').coordinates)], {
					weight: 1,
					color: '#444',
					className: 'animate-letter'
				}).addTo(this.mapView.map);

		this.mapView.map.fitBounds([L.latLng(this.model.get('dispatchplace').coordinates), L.latLng(this.model.get('destinationplace').coordinates)], {
				maxZoom: 9
			});
		
		return this;
	}
});