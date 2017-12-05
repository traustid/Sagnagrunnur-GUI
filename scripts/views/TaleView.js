var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet');

var DataView = require('./DataView');
var DataModel = require('./../models/DataModel');

module.exports = DataView.extend({
	initialize: function(options) {
		this.options = options;

		this.model = new DataModel();
		this.model.once('change', this.render, this);
		this.model.url = '/grunnur/api/fairytale/'+this.options.taleId;
		this.model.fetch();
	},

	render: function() {
		var template = _.template($("#taleViewTemplate").html());

		this.$el.html(template({
			model: this.model
		}));

		return this;
	},

	destroy: function() {
		DataView.prototype.destroy.call(this);
	}
});