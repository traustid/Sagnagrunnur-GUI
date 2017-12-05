var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var TalesListCollection = require('./../collections/TalesListCollection');
var MapPageView = require('./MapPageView');
var DataListView = require('./DataListView');

module.exports = DataListView.extend({
	uiTemplateName: 'legendListViewTemplate',

	initialize: function(options) {
		this.options = options;
		this.options.fairyTales = true;

		this.collection = new TalesListCollection();

		this.collection.on('reset', this.render, this);
		this.collection.metadata.on('change', this.updateMetadata, this);

		if (this.options.atNumber != '' && this.options.atNumber != null) {
			this.collection.talesByAtNumber(this.options.atNumber);
		}
		else if (this.options.category != '' && this.options.category != null) {
			this.collection.talesByCategory(this.options.category);
		}
		else if (this.options.searchQuery != '' && this.options.searchQuery != null) {
			this.collection.search(this.options.searchQuery);
		}
		else {
			this.collection.getPage(this.options.page);
		}

		if (this.options.renderUI != undefined) {
			if (this.options.renderUI != false) {
				this.renderUI();
			}
		}
		else {
			this.renderUI();
		}

		this.on('search', _.bind(function(event) {
			this.options.router.navigate('/tales/search/'+event.query, {
				trigger: true
			});
		}, this));


		if (this.$el.find('.search-form').length > 0) {
			var SearchFormView = require('./SearchFormView');
			this.searchForm = new SearchFormView({
				el: this.$el.find('.search-form')
			});

			this.searchForm.on('search', this.searchFormSearch, this);
		}

		if (this.$el.find('.legends-map').length > 0) {
			this.mapView = new MapPageView({
				el: this.$el.find('.legends-map'),
				disableUIRender: true,
				router: this.options.router
			});
		}
	},

	searchFormSearch: function(event) {
		this.collection.currentPage = 1;

		this.options.router.navigate('legends/'+this.collection.currentPage+
			(event.tags && event.tags.length > 0 ? '/tags/'+_.pluck(event.tags, 'id').join(';') : '')+
			(event.collection && event.collection != "" ? '/collection/'+event.collection : '')+
			(event.personCounty && event.personCounty != "" ? '/person_county/'+event.personCounty : '')+
			(event.personMunicipality && event.personMunicipality != "" ? '/person_municipality/'+event.personMunicipality : '')+
			(event.personGender && event.personGender != "" ? '/person_gender/'+event.personGender : '')+
			(event.personRelation && event.personRelation != "" ? '/person_relation/'+event.personRelation : '')
		, {
			trigger: true
		});
	},

	updateMetadata: function() {
		if (this.collection.metadata.get('page') != undefined) {
			this.$el.find('.page-info').html((Number(this.collection.metadata.get('page'))+200)+' / '+this.collection.metadata.get('total'));
		}
	},

	getLegends: function(page, tags, collection, personCounty, personMunicipality, personGender, personRelation) {
		this.collection.getLegends(page == null ? 1 : page, tags, collection, personCounty, personMunicipality, personGender, personRelation);
		this.mapView.collection.getPlaces('legends', {
			tags: tags,
			collection: collection,
			person_county: personCounty,
			person_municipality: personMunicipality,
			person_gender: personGender,
			person_relation: personRelation
		});
	},

	render: function() {
		if (this.options.route) {
			if (this.collection.searchQuery != '') {
				this.options.router.navigate('/tales/search/'+this.collection.searchQuery);
			}
			else {
				this.options.router.navigate('/tales/'+this.collection.currentPage);
			}
		}

		this.renderList();

		return this;
	},

	renderList: function() {
		var template = _.template($("#legendListTemplate").html());

		this.$el.find('.list-container').html(template({
			models: this.collection.models,
			fairyTales: true
		}));
	}
});
