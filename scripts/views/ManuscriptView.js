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
		this.model.on('sync', this.modelSaved, this);
		this.model.url = '/grunnur/api/manuscript/'+this.options.manuscriptId;
		this.model.fetch();
	},

		events: {
			'click .image-link': 'imageLinkClick'
		},

		imageLinkClick: function(event) {
			event.preventDefault();

			var imageUrl = $(event.currentTarget).attr('href');

			this.options.app.$el.find('.overlay-container').html('<div class="image-overlay"><img src="'+imageUrl+'"/></div>');

			$(document.body).addClass('has-overlay');

			this.options.app.$el.find('.overlay-container').click(_.bind(function() {
				this.options.app.$el.find('.overlay-container').html('');
				$(document.body).removeClass('has-overlay');
			}, this));
		},

		getManuscript: function(manuscriptId) {
		this.options.manuscriptId = manuscriptId;
		this.model.clear();
		this.model.once('change', this.render, this);
		this.model.url = '/grunnur/api/manuscript/'+manuscriptId;
		this.model.fetch();
	},

	render: function() {
		window.model = this.model;

		var template = _.template($("#manuscriptViewTemplate").html());

		this.$el.html(template({
			model: this.model
		}));

		if (this.options.msitem) {
			var anchor = $('a[name="msitem-'+this.options.msitem+'"]');
    		$('html,body').scrollTop(anchor[0].offsetTop);
		}

		return this;
	}
});