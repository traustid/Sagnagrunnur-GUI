var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DataModel = require('./../models/DataModel');

module.exports = Backbone.Collection.extend({
	model: DataModel,

	initialize: function() {
		this.metadata = new Backbone.Model();
	},

	parse: function(data) {
		this.metadata.set({
			tag: data.tag,
			count: data.count,
			id: data.id
		});
		
		return data.relations;
	}
});