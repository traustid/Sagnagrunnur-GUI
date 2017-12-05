var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.View.extend({
	
	initialize: function(options) {
		this.render();
	},

	events: {
		'click .dropdown-trigger': 'triggerClick'
	},

	triggerClick: function() {
		this.$el.toggleClass('open')
	},

	render: function() {
		this.$el.click(_.bind(function(event) {
			event.stopPropagation();
		}, this));
	}
});