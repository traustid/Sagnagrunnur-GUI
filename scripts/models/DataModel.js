var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.Model.extend({
	months: [
		'janúar',
		'febrúar',
		'mars',
		'apríl',
		'maí',
		'júní',
		'júlí',
		'ágúst',
		'september',
		'október',
		'nóvember',
		'desember'
	],

	formatDate: function(date) {
		if (date) {
			var d = date.split('-');

			return (d[2] ? d[2]+'. ' : '')+
				(d[1] ? this.months[d[1]-1]+' ' : '')+
				(d[0] ? d[0] : '');				
		}
		else {
			return '';
		}
	}
});