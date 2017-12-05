var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.View.extend({
	selectedTags: [],
	
	initialize: function(options) {
		this.collection = new Backbone.Collection();
		this.collection.url = '/grunnur/api/tags/order/name';
		this.collection.on('reset', this.collectionReset, this);
		this.collection.fetch({
			reset: true
		});
	},

	events: {
		'click button.select-deselect': 'deselectButtonClick',
		'click .item input': 'checkBoxClick',
		'click .dropdown-trigger': 'dropdownTriggerClick',
		'keyup .input-search-tags': 'tagSearchKeyup'
	},

	deselectButtonClick: function() {
		this.$el.find('.item input').removeAttr('checked');

		this.updateCheckedItems();
	},

	checkBoxClick: function(event) {
		this.updateCheckedItems();
	},

	dropdownTriggerClick: function() {
		this.$el.find('.input-search-tags').val('');

		this.tagSearchKeyup();
	},

	tagSearchKeyup: function() {
		if (this.$el.find('.input-search-tags').val().length > 2) {
			this.$el.find('.item:not(:contains("'+this.$el.find('.input-search-tags').val()+'"))').addClass('u-hidden');
		}
		else {
			this.$el.find('.item').removeClass('u-hidden');
		}
	},

	updateCheckedItems: function() {
		this.selectedTags = [];

		_.each(this.$el.find('.item input'), _.bind(function(input) {
			if ($(input).is(":checked")) {
				this.selectedTags.push({
					id: $(input).data('id'),
					tag: $(input).data('tag')
				});
			}
		}, this));

		if (this.selectedTags.length == 0) {
			this.$el.find('.dropdown-trigger').html('Engin efnisorð valin');
		}
		else {
			this.$el.find('.dropdown-trigger').html(_.pluck(this.selectedTags, 'tag').join(', '));
		}

		this.trigger('change');
	},

	setInitalTags: function(tags) {
		console.log('setInitalTags');
		if (this.collection.length == 0) {
			this.initalTags = tags;
		}
		else {
			this.$el.find('.item input').prop('checked', false);
			
			_.each(this.$el.find('.item input'), _.bind(function(input) {
				if (tags.indexOf($(input).data('id')) > -1) {
					$(input).prop('checked', true);
				}
			}, this));

			this.updateCheckedItems();
		}
	},

	collectionReset: function() {
		var tagsHtml = '';
		_.each(this.collection.models, _.bind(function(model) {
			tagsHtml += '<div class="item"><label><input type="checkbox" data-id="'+model.get('id')+'" data-tag="'+model.get('tag')+'"></input> '+model.get('tag')+'</label><div class="u-cf"></div></div>';
		}, this));

		this.$el.find('.tags-list').html(tagsHtml);

		if (this.initalTags) {
			_.each(this.$el.find('.item input'), _.bind(function(input) {
				if (this.initalTags.indexOf($(input).data('id')) > -1) {
					$(input).prop('checked', true);
				}
			}, this));

			this.updateCheckedItems();
		}

		this.render();
	}
});