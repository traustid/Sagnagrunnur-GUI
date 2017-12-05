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
		this.model.url = (window.sgBaseUrl ? window.sgBaseUrl : '')+'/grunnur/api/person/'+this.options.personId;
		this.model.fetch();
	},

	getPerson: function(personId) {
		this.options.personId = personId;
		this.model.clear();
		this.model.once('change', this.render, this);
		this.model.url = '/grunnur/api/person/'+personId;
		this.model.fetch();
	},

	render: function() {
		window.model = this.model;

		var template = _.template($("#personViewTemplate").html());

		var mapBounds = [];


		var layers = [];
		var menuLayers = {};


		var homesLayer = L.layerGroup();
		layers.push(homesLayer);
		menuLayers['<span class="marker-inline circle blue"></span> Heimili'] = homesLayer;

		_.each(this.model.get('homes'), _.bind(function(home) {
			if (home.coordinates && home.coordinates.length > 0) {
				mapBounds.push(home.coordinates);

				var marker = L.marker(home.coordinates, {
					icon: mapHelper.createDivIcon('blue'),
					zIndexOffset: 2
				}).bindPopup('<p><strong>'+home.name+'</strong></p><p><a href="#place/'+home.id+'">Sjá nánar</a></p>');
				homesLayer.addLayer(marker);
			}
		}, this));

		var recordersHomes = [];

		if (this.model.get('recorders') && this.model.get('recorders').length > 0) {
			_.each(this.model.get('recorders'), function(recorder) {
				if (recorder.homes) {
					recordersHomes = _.union(recordersHomes, _.map(recorder.homes, function(home) {
						if (home.coordinates && home.coordinates.length > 0) {
							mapBounds.push(home.coordinates);

							return {
								id: home.id,
								name: home.name,
								personName: recorder.name,
								personId: recorder.id,
								coordinates: home.coordinates
							};
						}
						else {
							return [];
						}
					}));
				}
			});

			if (recordersHomes.length > 0) {
				var recordersLayer = L.layerGroup();
				layers.push(recordersLayer);
				menuLayers['<span class="marker-inline circle pink"></span> Heimili skrásetjara'] = recordersLayer;

				_.each(recordersHomes, _.bind(function(recorderHome) {
					if (recorderHome.coordinates && recorderHome.coordinates.length > 0) {
						mapBounds.push(recorderHome.coordinates);

						var marker = L.marker(recorderHome.coordinates, {
							icon: mapHelper.createDivIcon('pink'),
							zIndexOffset: 1
						}).bindPopup('<p><strong>'+recorderHome.name+'</strong><br/>'+recorderHome.personName+'</p><p><a href="#person/'+recorderHome.personId+'">Sjá nánar</a></p>');

						recordersLayer.addLayer(marker);
					}
				}, this));
			}
		}

		var informantsHomes = [];
		var informantsLegendPlaces = [];

		if (this.model.get('informants') && this.model.get('informants').length > 0) {
			_.each(this.model.get('informants'), function(informant) {
				if (informant.homes) {
					informantsHomes = _.union(informantsHomes, _.map(informant.homes, function(home) {
						if (home.coordinates && home.coordinates.length > 0) {
							mapBounds.push(home.coordinates);

							return {
								id: home.id,
								name: home.name,
								personName: informant.name,
								personId: informant.id,
								coordinates: home.coordinates
							};
						}
						else {
							return [];
						}
					}));
				}
				if (informant.legends.places) {
					informantsLegendPlaces = _.union(informantsLegendPlaces, _.map(informant.legends.places, function(legendPlace) {
						if (legendPlace.coordinates && legendPlace.coordinates.length > 0) {
							mapBounds.push(legendPlace.coordinates);

							return {
								id: legendPlace.id,
								name: legendPlace.name,
								coordinates: legendPlace.coordinates,
								connectTo: informant.homes ? informant.homes[0].coordinates : null
							};
						}
						else {
							return [];
						}
					}));
				}
			});

			if (informantsHomes.length > 0) {
				var informantsLayer = L.layerGroup();
				layers.push(informantsLayer);
				menuLayers['<span class="marker-inline circle orange"></span> Heimili heimildamanna'] = informantsLayer;

				_.each(informantsHomes, _.bind(function(informantHome) {
					if (informantHome.coordinates && informantHome.coordinates.length > 0) {
						mapBounds.push(informantHome.coordinates);

						var marker = L.marker(informantHome.coordinates, {
							icon: mapHelper.createDivIcon('orange')
						}).bindPopup('<p><strong>'+informantHome.name+'</strong><br/>'+informantHome.personName+'</p><p><a href="#person/'+informantHome.personId+'">Sjá nánar</a></p>');

						informantsLayer.addLayer(marker);
					}
				}, this));
			}

			if (informantsLegendPlaces.length > 0) {
				var informantsLegendsLayer = L.layerGroup();
				menuLayers['<span class="marker-inline circle orange small"></span> Sögustaðir heimildamanna'] = informantsLegendsLayer;

				_.each(informantsLegendPlaces, _.bind(function(legendPlace) {
					if (legendPlace.coordinates && legendPlace.coordinates.length > 0) {
						var marker = L.marker(legendPlace.coordinates, {
							icon: mapHelper.createDivIcon('orange', true)
						}).bindPopup('<p><strong>'+legendPlace.name+'</strong><p><a href="#place/'+legendPlace.id+'">Sjá nánar</a></p>');

						informantsLegendsLayer.addLayer(marker);

						console.log(legendPlace);

						if (legendPlace.connectTo && legendPlace.connectTo.length == 2 && legendPlace.coordinates && legendPlace.coordinates.length == 2) {
							console.log(legendPlace.connectTo);
							console.log(legendPlace.coordinates);
							informantsLegendsLayer.addLayer(L.polyline([
									L.latLng(legendPlace.coordinates[0], legendPlace.coordinates[1]), 
									L.latLng(legendPlace.connectTo[0], legendPlace.connectTo[1])
								], {
								weight: 0.5,
								color: '#444'
							}));
						}
					}
				}, this));
			}
		}

		if (this.model.get('legends').places && this.model.get('legends').places.length > 0) {
			var legendsLayer = L.layerGroup();
			layers.push(legendsLayer);
			menuLayers['<span class="marker-inline circle green small"></span> Sögustaðir sagna'] = legendsLayer;

			_.each(this.model.get('legends').places, _.bind(function(place) {
				if (place.coordinates && place.coordinates.length > 0) {
					mapBounds.push(place.coordinates);

					var marker = L.marker(place.coordinates, {
						icon: mapHelper.createDivIcon('green', true)
					}).bindPopup('<p><strong>'+place.name+'</strong></p><p><b>'+place.legend.name+'</b><br/><i>'+place.legend.source+'</i></p><p><a href="#legend/'+place.legend.id+'">Sjá nánar</a></p>');
					legendsLayer.addLayer(marker);
				}
			}, this));
		}

		this.$el.html(template({
			model: this.model,
			informantsHomesCount: informantsHomes.length,
			recordersHomesCount: recordersHomes.length
		}));

		var renderMap = false;

		this.homesMap = new MapView({
			el: this.$el.find('.map-wrapper'),
			mapSizeUi: true,
			layers: layers,
			overlays: menuLayers
		});

		if (mapBounds.length > 0) {
			this.homesMap.map.fitBounds(mapBounds, {
				maxZoom: 9
			});
		}

		if (this.$el.find('.letters-to-map-wrapper').length > 0) {
			this.lettersToMap = new MapView({
				el: this.$el.find('.letters-to-map-wrapper'),
				showLayerMenu: true
			});
			
			var markersCoords = [];
			var destinationsTo = [];

			_.each(this.model.get('letters').to, _.bind(function(letter) {
				if (letter.dispatchplace.coordinates && letter.dispatchplace.coordinates.length > 0) {
					if (_.findWhere(markersCoords, letter.dispatchplace.coordinates) == undefined) {
						L.marker(letter.dispatchplace.coordinates, {
							icon: mapHelper.smallIconBlue
						}).addTo(this.lettersToMap.map).bindPopup(
							'<p><strong>'+letter.sender.name+'</strong><br/>'+
							letter.date+'<br/>'+
							letter.dispatchplace.name+'</p>'+
							'<p><a href="#person/'+letter.sender.id+'">Sjá nánar</a></p>'
						);

						markersCoords.push(letter.dispatchplace.coordinates);
					}
				}
				if (letter.destinationplace.coordinates && letter.destinationplace.coordinates.length > 0) {
					if (_.findWhere(markersCoords, letter.destinationplace.coordinates) == undefined) {
						L.marker(letter.destinationplace.coordinates, {
							icon: mapHelper.smallIconBlue
						}).addTo(this.lettersToMap.map).bindPopup(
							'<p><strong>'+letter.receiver.name+'</strong><br/>'+
							letter.date+'<br/>'+
							letter.destinationplace.name+'</p><p><a href="#person/'+letter.receiver.id+'">Sjá nánar</a></p>'
						);

						markersCoords.push(letter.destinationplace.coordinates);
					}
				}
				if (letter.dispatchplace.coordinates && letter.dispatchplace.coordinates.length > 0 && letter.destinationplace.coordinates && letter.destinationplace.coordinates.length > 0) {
					if (_.findWhere(destinationsTo, [letter.dispatchplace.coordinates, letter.destinationplace.coordinates]) == undefined) {
						destinationsTo.push([letter.dispatchplace.coordinates, letter.destinationplace.coordinates]);
					}
				}

			}, this));

			_.each(destinationsTo, _.bind(function(line) {
				L.polyline([L.latLng(line[0][0], line[0][1]), L.latLng(line[1][0], line[1][1])], {
					weight: 1,
					color: '#444'
				}).addTo(this.lettersToMap.map);
			}, this));

			this.lettersToMap.map.fitBounds(markersCoords, {
				maxZoom: 9
			});
			
		}

		if (this.$el.find('.letters-from-map-container').length > 0) {
			this.lettersFromMap = L.map(this.$el.find('.letters-from-map-container')[0], {
				scrollWheelZoom: false
			});
			
			L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
				maxZoom: 20,
				attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(this.lettersFromMap);
			
			var markersCoords = [];
			var destinationsTo = [];

			_.each(this.model.get('letters').from, _.bind(function(letter) {
				if (letter.dispatchplace.coordinates.length > 0) {
					if (_.findWhere(markersCoords, letter.dispatchplace.coordinates) == undefined) {
						L.marker(letter.dispatchplace.coordinates, {
							icon: mapHelper.smallIconBlue
						}).addTo(this.lettersFromMap).bindPopup(
							'<p><strong>'+letter.sender.name+'</strong><br/>'+
							letter.dispatchplace.name+'</p>'+
							'<p><a href="#person/'+letter.sender.id+'">Sjá nánar</a></p>'
						);

						markersCoords.push(letter.dispatchplace.coordinates);
					}
				}
				if (letter.destinationplace.coordinates.length > 0) {
					if (_.findWhere(markersCoords, letter.destinationplace.coordinates) == undefined) {
						L.marker(letter.destinationplace.coordinates, {
							icon: mapHelper.smallIconBlue
						}).addTo(this.lettersFromMap).bindPopup(
							'<p><strong>'+letter.receiver.name+'</strong><br/>'+
							letter.destinationplace.name+'</p>'+
							'<p><a href="#person/'+letter.receiver.id+'">Sjá nánar</a></p>'
						);

						markersCoords.push(letter.destinationplace.coordinates);
					}
				}
				if (letter.dispatchplace.coordinates.length > 0 && letter.destinationplace.coordinates.length > 0) {
					if (_.findWhere(destinationsTo, [letter.dispatchplace.coordinates, letter.destinationplace.coordinates]) == undefined) {
						destinationsTo.push([letter.dispatchplace.coordinates, letter.destinationplace.coordinates]);
					}
				}

			}, this));

			_.each(destinationsTo, _.bind(function(line) {
				L.polyline([L.latLng(line[0][0], line[0][1]), L.latLng(line[1][0], line[1][1])], {
					weight: 1,
					color: '#444'
				}).addTo(this.lettersFromMap);
			}, this));

			this.lettersFromMap.fitBounds(markersCoords, {
				maxZoom: 9
			});
			
		}

		if (this.$el.find('.tabs-control').length > 0) {
			var TabsView = require('./TabsView');
			_.each(this.$el.find('.tabs-control'), _.bind(function(tabsControl) {
				new TabsView({
					el: $(tabsControl)
				});
			}, this));
		}

		return this;
	}
});