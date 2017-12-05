var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet');

var noUiSlider = require('../lib/nouislider.min');

var LettersListCollection = require('./../collections/LettersListCollection');
var DataListView = require('./DataListView');

var mapHelper = require('./../utils/MapHelper.js');

module.exports = DataListView.extend({
	uiTemplateName: 'lettersListViewTemplate',

	startDate: '1851-01-01',
	endDate: '1870-12-31',

	initialize: function(options) {
		this.options = options;

		this.collection = new LettersListCollection();
		this.collection.on('reset', this.render, this);

		this.renderUI(_.bind(function() {
			this.initMap();

			this.initSlider();

			this.initGraph();
		}, this));

		this.collection.getPeriod(this.options.personId, this.options.dateFrom ? this.options.dateFrom : this.startDate, this.options.dateTo ? this.options.dateTo : this.endDate);
	},

	initMap: function() {
		this.map = L.map(this.$el.find('.map-container')[0], {
			scrollWheelZoom: true,
			zoom: 6,
			center: [64.8862, -18.5998]
		});

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);

		this.markers = L.featureGroup();
		this.map.addLayer(this.markers);

		this.lines = L.featureGroup();
		this.map.addLayer(this.lines);
	},

	waitingForSlider: false,

	initSlider: function() {
		this.slider = noUiSlider.create(this.$el.find('.slider-container')[0], {
			start: [new Date(this.options.dateFrom ? this.options.dateFrom : this.startDate).getTime(), new Date(this.options.dateTo ? this.options.dateTo : this.endDate).getTime()],
			step: 1,
			behaviour: 'drag',
			connect: true,
			range: {
				min: Number(new Date(this.startDate).getTime()),
				max: Number(new Date(this.endDate).getTime())
			}
		});

		this.$el.find('.slider-container .noUi-handle-lower').html('<div class="handle-number number-top">'+this.formatDate(new Date(this.options.dateFrom ? this.options.dateFrom : this.startDate))+'</div>');
		this.$el.find('.slider-container .noUi-handle-upper').html('<div class="handle-number">'+this.formatDate(new Date(this.options.dateTo ? this.options.dateTo : this.endDate))+'</div>');

		this.slider.on('slide', _.bind(function(event, ui) {
			this.$el.find('.slider-container .noUi-handle-lower').html('<div class="handle-number number-top">'+this.formatDate(this.slider.get()[0])+'</div>');
			this.$el.find('.slider-container .noUi-handle-upper').html('<div class="handle-number">'+this.formatDate(this.slider.get()[1])+'</div>');

			if (!this.waitingForSlider) {
				this.waitingForSlider = true;
				var dateFrom = new Date(Number(appView.mainView.slider.get()[0]));
				var dateTo = new Date(Number(appView.mainView.slider.get()[1]));

				this.options.router.navigate('letters/'+this.options.personId+
					'/datefrom/'+dateFrom.getFullYear()+'-'+(dateFrom.getMonth()+1)+'-'+(dateFrom.getDate())+
					'/dateto/'+dateTo.getFullYear()+'-'+(dateTo.getMonth()+1)+'-'+(dateTo.getDate()), {
						trigger: true
					});

				setTimeout(_.bind(function() {
					this.waitingForSlider = false;
				}, this), 1000);
			}
		}, this));

		this.slider.on('change', _.bind(function(event, ui) {
			var dateFrom = new Date(Number(appView.mainView.slider.get()[0]));
			var dateTo = new Date(Number(appView.mainView.slider.get()[1]));

			this.options.router.navigate('letters/'+this.options.personId+
				'/datefrom/'+dateFrom.getFullYear()+'-'+(dateFrom.getMonth()+1)+'-'+(dateFrom.getDate())+
				'/dateto/'+dateTo.getFullYear()+'-'+(dateTo.getMonth()+1)+'-'+(dateTo.getDate()), {
					trigger: true
				});
		}, this));
	},

	initGraph: function() {
		var graphContainer = this.$el.find('.month-graph-container');

		var graphCollection = new Backbone.Collection();
		graphCollection.url = (window.sgBaseUrl ? window.sgBaseUrl : '')+'/grunnur/api/letters/per_month/person/'+this.options.personId;
		graphCollection.on('reset', _.bind(function() {
			var startDateValue = new Date(this.startDate).getTime();
			var endDateValue = new Date(this.endDate).getTime();
			var range = endDateValue-startDateValue;

			_.each(graphCollection.models[0].get('month'), function(month) {
				var monthValue = new Date(month).getTime();

				if (monthValue > startDateValue && monthValue < endDateValue) {
					var monthRangePos = (range-(endDateValue-monthValue));
					var itemPos = (monthRangePos/range)*100;

					graphContainer.append('<div class="dot" style="left: '+itemPos+'%"></div>');
				}
			});
		}, this));
		graphCollection.fetch({
			reset: true
		});
	},

	formatDate: function(date, forAPI) {
		var d = new Date(Math.round(date));

		return forAPI ? d.getFullYear()+'-'+(d.getMonth()+1) : (d.getMonth()+1)+'/'+d.getFullYear();
	},

	render: function() {
		this.renderList();

		return this;
	},

	renderList: function() {

		var template = _.template($("#lettersListTemplate").html());

		this.$el.find('.list-container').html(template({
			models: this.collection.models
		}));

		var markersCoords = [];
		var destinationsTo = [];

		this.markers.clearLayers();
		this.lines.clearLayers();

		_.each(this.collection.models, _.bind(function(letter) {
			if (letter.get('dispatchplace').coordinates.length > 0) {
				if (_.findWhere(markersCoords, letter.get('dispatchplace').coordinates) == undefined) {
					var marker = L.marker(letter.get('dispatchplace').coordinates, {
						icon: mapHelper.smallIconOrange
					}).bindPopup(
						'<p><strong>'+letter.get('sender').name+'</strong><br/>'+
						letter.get('dispatchplace').name+'</p>'+
						'<p><a href="#person/'+letter.get('sender').id+'">Sjá nánar</a></p>'
					);

					this.markers.addLayer(marker);

					markersCoords.push(letter.get('dispatchplace').coordinates);
				}
			}
			if (letter.get('destinationplace').coordinates.length > 0) {
				if (_.findWhere(markersCoords, letter.get('destinationplace').coordinates) == undefined) {
					var marker = L.marker(letter.get('destinationplace').coordinates, {
						icon: mapHelper.smallIconBlue
					}).bindPopup(
						'<p><strong>'+letter.get('receiver').name+'</strong><br/>'+
						letter.get('destinationplace').name+'</p>'+
						'<p><a href="#person/'+letter.get('receiver').id+'">Sjá nánar</a></p>'
					);

					this.markers.addLayer(marker);

					markersCoords.push(letter.get('destinationplace').coordinates);
				}
			}
			if (letter.get('dispatchplace').coordinates.length > 0 && letter.get('destinationplace').coordinates.length > 0) {
				if (_.findWhere(destinationsTo, [letter.get('dispatchplace').coordinates, letter.get('destinationplace').coordinates]) == undefined) {
					destinationsTo.push([letter.get('dispatchplace').coordinates, letter.get('destinationplace').coordinates]);
				}
			}
		}, this));

		_.each(destinationsTo, _.bind(function(line) {
			var polyline = L.polyline([L.latLng(line[0][0], line[0][1]), L.latLng(line[1][0], line[1][1])], {
				weight: 1,
				color: '#444',
				className: 'animate-letter'
			});

			this.lines.addLayer(polyline);
		}, this));
/*
		this.map.fitBounds(markersCoords, {
			maxZoom: 9
		});
*/
	}
});