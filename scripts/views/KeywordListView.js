var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DataListView = require('./DataListView');

module.exports = DataListView.extend({
	uiTemplateName: 'keywordListViewTemplate',

	initialize: function(options) {
		this.options = options;

		this.collection = new Backbone.Collection();
		this.collection.on('reset', this.render, this);

		if (this.options.renderUI != undefined) {
			if (this.options.renderUI != false) {
				this.renderUI();
			}
		}
		else {
			this.renderUI();
		}

		this.collection.url = '/grunnur/api/tags';
		this.collection.fetch({
			reset: true
		});
	},

	render: function() {
		this.renderList();

		return this;
	},

	renderList: function() {

		var template = _.template($("#keywordListTemplate").html());

		this.$el.find('.list-container').html(template({
			models: this.collection.models
		}));			
	}
});