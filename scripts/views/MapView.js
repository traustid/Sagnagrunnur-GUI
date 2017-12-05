var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet.markercluster');
require('../lib/leaflet-heat');

var MapCollection = require('./../collections/MapCollection');
var DataListView = require('./DataListView');
var DataCollection = require('./../collections/DataCollection');
var mapHelper = require('./../utils/MapHelper.js');

module.exports = Backbone.View.extend({
	uiTemplateName: 'mapViewTemplate',

	initialize: function(options) {
		this.options = options;

		if (this.options.dataUrl) {
			this.collection = new DataCollection();
			this.collection.url = this.options.dataUrl;

			this.collection.on('reset', this.renderMarkers, this);

			this.collection.fetch({
				reset: true
			});
		}

		this.render();
		this.renderMap();
	},

	events: {
		'click .view-mode-toolbar a': 'viewModeClick',
		'click .map-size-toolbar a': 'mapSizeClick',
	},

	viewModeClick: function(event) {
		this.setViewmode($(event.currentTarget).data('viewmode'));
	},

	mapSizeClick: function(event) {
		var mapSize = $(event.currentTarget).data('mapsize');

		if (mapSize == 'small') {
			this.$el.find('.map-container').removeClass('large');
			this.$el.find('.map-container').removeClass('full');
		}
		if (mapSize == 'large') {
			this.$el.find('.map-container').removeClass('full');
			this.$el.find('.map-container').addClass('large');
		}
		if (mapSize == 'full') {
			this.$el.find('.map-container').removeClass('large');
			this.$el.find('.map-container').addClass('full');
		}

		setTimeout(_.bind(function() {
			this.map.invalidateSize()
		}, this), 400);
	},

	getData: function(url) {
		if (!this.collection) {
			this.initCollection();
		}

		this.collection.url = this.options.dataUrl;

		this.collection.fetch({
			reset: true
		});
	},

	initCollection: function() {
		this.collection = new Backbone.Collection();
		this.collection.on('reset', this.renderMarkers, this);
	},

	renderMap: function() {
		var openStreetMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		});
		
		var OpenMapSurfer_Roads = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
			maxZoom: 20,
			attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		var esriLayer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
			maxZoom: 16,
			attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
		});

		var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		});

		var initialLayers = [openStreetMap];
		if (this.options.layers) {
			initialLayers = initialLayers.concat(this.options.layers);
		}

		this.map = L.map(this.$el.find('.map-container')[0], {
			center: [64.9142, -18.6987],
			zoom: 6,
			minZoom: 3,
			layers: initialLayers
		});

		var layersControlLayers = {
			'Kort': openStreetMap,
			'Gráskali': esriLayer,
			'Loftmynd': Esri_WorldImagery
		};

		var layersControl = L.control.layers(layersControlLayers, this.options.overlays ? this.options.overlays : null, {
			collapsed: false
		});

		layersControl.addTo(this.map);

		if (this.collection && this.collection.length > 0) {
			this.setViewmode('clusters');
		}

		if (this.options.viewModesUi || this.options.mapSizeUi) {
			this.$el.append('<div class="map-toolbars"></div>');
		}

		if (this.options.viewModesUi) {
			this.$el.find('.map-toolbars').append('<div class="toolbar view-mode-toolbar">'+
				'<div class="label">Birting punkta:</div>'+
				'<a data-viewmode="clusters">Þyrpingar</a>'+
				'<a data-viewmode="markers">Punktar</a>'+
				'<a data-viewmode="heatmap">Hitakort</a>'+
				'</div>');
			this.setViewmode('clusters');
		}

		if (this.options.mapSizeUi) {
			this.$el.find('.map-toolbars').append('<div class="toolbar map-size-toolbar">'+
				'<div class="label">Kortastærð:</div>'+
				'<a data-mapsize="small">Lítið</a>'+
				'<a data-mapsize="large">Stórt</a>'+
				'</div>');
			this.setViewmode('clusters');
		}
	},

	setViewmode: function(viewMode) {
		if (viewMode != this.viewMode) {
			this.viewMode = viewMode;

			if (this.markers) {
				if (this.markers.clearLayers) {
					this.markers.clearLayers();
				}

				this.map.removeLayer(this.markers);
			}

			switch (this.viewMode) {
				case 'markers':
					this.markers = L.featureGroup();
					this.map.addLayer(this.markers);
					break;
				case 'circles':
					this.markers = L.featureGroup();
					this.map.addLayer(this.markers);
					break;
				case 'clusters':
					this.markers = new L.MarkerClusterGroup({
						showCoverageOnHover: false,
						maxClusterRadius: 40
					});
					this.map.addLayer(this.markers);
					break;
				case 'heatmap':
					this.markers = L.heatLayer([], {
						minOpacity: 0.35,
						radius: 18,
						blur: 15
					});
					this.markers.addTo(this.map);
			}

			if (this.collection && this.collection.length > 0) {
				this.renderMarkers();
			}
		}
	},

	addData: function(data) {
		if (!this.collection) {
			this.initCollection();
		}
		this.collection.reset(data);
	},

	renderMarkers: function() {
		var dataModels = this.collection.models;

		if (this.viewMode == 'markers' || this.viewMode == 'clusters') {			
			this.markers.clearLayers();

			if (dataModels.length > 0) {
				_.each(dataModels, _.bind(function(model) {
					var template = _.template(this.options.popupTemplate);
					var popupHtml = template({
						model: model
					});

					var marker = L.marker(model.get('coordinates'), {
						title: model.get('name'),
						icon: mapHelper.createDivIcon('orange')
					});
					marker.bindPopup(popupHtml);

					this.markers.addLayer(marker);
				}, this));
			}
		}
		if (this.viewMode == 'heatmap') {
			var latLngs = _.map(dataModels, _.bind(function(model) {
				return model.get('coordinates');
			}, this));
			this.markers.setLatLngs(latLngs);
		}
	}
});