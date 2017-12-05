var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DataModel = require('./../models/DataModel');

module.exports = Backbone.Collection.extend({
	urlBase: (window.sgBaseUrl ? window.sgBaseUrl : '')+'/grunnur/api/letters',
	model: DataModel,

	initialize: function() {
		this.metadata = new Backbone.Model();
	},

	getPeriod: function(person, from, to) {
		this.url = this.urlBase+'/person/'+person+(from != null ? '/datefrom/'+from : '')+(to != null ? '/dateto/'+to : '');
		this.fetch({
			reset: true
		});
	}
});