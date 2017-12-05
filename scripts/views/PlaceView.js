var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet');

var DataView = require('./DataView');
var PersonListView = require('./PersonListView');
var DataModel = require('./../models/DataModel');

module.exports = DataView.extend({
	initialize: function(options) {
		this.options = options;

		this.getPlace(this.options.placeId);
	},

	getPlace: function(placeId) {
		this.model = new DataModel();
		this.model.once('change', this.render, this);
		this.model.url = (window.sgBaseUrl ? window.sgBaseUrl : '')+'/grunnur/api/place/'+placeId;
		this.model.fetch();
	},

	render: function() {
		var template = _.template($("#placeViewTemplate").html());

		this.$el.html(template({
			model: this.model
		}));

		if (this.$el.find('.map-container').length > 0) {
			this.map = L.map(this.$el.find('.map-container')[0], {
				scrollWheelZoom: false
			}).setView(this.model.get('coordinates'), 7);

			L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
				maxZoom: 20,
				attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(this.map);

			this.marker = L.marker(this.model.get('coordinates')).addTo(this.map);
		}

		this.personList = new PersonListView({
			el: this.$el.find('.person-list-container'),
			placeId: this.model.get('id'),
			renderUI: false,
			hideCheckBoxes: true
		});

		return this;
	},

	destroy: function() {
		this.personList.destroy();

		DataView.prototype.destroy.call(this);
	}
});
