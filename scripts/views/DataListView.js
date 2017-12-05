var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.View.extend({
	events: {
		'click .footer-toolbar .prev': function() {
			if (this.collection.currentPage > 1) {
				this.trigger('page', {
					page: Number(this.collection.currentPage)-1
				});
			}
		},
		'click .footer-toolbar .next': function() {
			this.trigger('page', {
				page: Number(this.collection.currentPage)+1
			});
		},
		'keyup .footer-toolbar .search-input': function(event) {
			if (event.keyCode == 13) {
				if (this.$el.find('.footer-toolbar .search-input').val().length > 2) {
					this.trigger('search', {
						query: this.$el.find('.footer-toolbar .search-input').val()
					});
				}
			}
		}
	},

	destroy: function() {
		this.undelegateEvents();
		this.$el.removeData().unbind();
		this.$el.html('');
	},

	updateMetadata: function() {
		this.$el.find('.page-info').html((Number(this.collection.metadata.get('page'))+200)+' / '+this.collection.metadata.get('total'));
	},

	renderUI: function(callback) {
		var template = _.template($("#"+this.uiTemplateName).html());

		this.$el.html(template({
			options: this.options
		}));

		if (this.$el.find('.tabs-control').length > 0) {
			var TabsView = require('./TabsView');
			_.each(this.$el.find('.tabs-control'), _.bind(function(tabsControl) {
				new TabsView({
					el: $(tabsControl)
				});
			}, this));
		}

		if (callback) {
			callback();
		}
		
		return this;
	}
});