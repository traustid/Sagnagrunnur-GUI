var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DataModel = require('./DataModel');

module.exports = DataModel.extend({
	parse: function(data) {
		if (data.manuscripts) {
			data.manuscripts = _.map(data.manuscripts, function(msitem) {
				if (msitem.note) {
					var el = $(msitem.note);
					var bookReference = '';
					_.each($(el).find('ref'), function(ref) {
						if ($(ref).attr('target').indexOf('baekur.is') > -1) {
							bookReference = $(ref).attr('target');
						}
					});

					if (bookReference != '') {
						msitem.book_reference = bookReference;
					}
				}

				console.log(msitem);
				return msitem;
			})
		}
		return data;
	}
});