var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var LegendListCollection = require('./../collections/LegendListCollection');
var DataListView = require('./DataListView');

var RelationView = require('./RelationView');
var YearsGraphView = require('./YearsGraphView');

module.exports = DataListView.extend({
	uiTemplateName: 'legendListViewTemplate',

	initialize: function(options) {
		this.options = options;

		this.collection = new LegendListCollection();

		this.collection.on('reset', this.render, this);
		this.collection.metadata.on('change', this.updateMetadata, this);

		if (this.options.renderUI != undefined) {
			if (this.options.renderUI != false) {
				this.renderUI();
			}
		}
		else {
			this.renderUI();
		}

		if (this.$el.find('.search-form').length > 0) {
			var SearchFormView = require('./SearchFormView');
			this.searchForm = new SearchFormView({
				el: this.$el.find('.search-form')
			});

			this.searchForm.on('search', this.searchFormSearch, this);

			this.searchForm.on('explanation', _.bind(function(event) {
				this.$el.find('.search-explanation').html(event.explanation);
			}, this));
		}

		if (this.$el.find('.legends-map').length > 0) {
			var MapPageView = require('./MapPageView');
			this.mapView = new MapPageView({
				el: this.$el.find('.legends-map'),
				disableUIRender: true,
				mapSizeUi: true,
				router: this.options.router
			});
			this.mapView.on('render', _.bind(function() {
				this.$el.find('.places-number').html(this.mapView.collection.length);
			}, this));
		}

		if (this.$el.find('.related-tags-view').length > 0) {
			this.keywordRelationView = new RelationView({
				el: this.$el.find('.related-tags-view'),
				type: 'tags'
			});
		}

		if (this.$el.find('.related-source-view').length > 0) {
			this.sourceRelationView = new RelationView({
				el: this.$el.find('.related-source-view'),
				type: 'source',
				disableLinks: true
			});
		}

		if (this.$el.find('.related-years-view').length > 0) {
			this.yearsRelationView = new YearsGraphView({
				el: this.$el.find('.related-years-view')
			});
		}
	},

	searchFormSearch: function(event) {
		this.collection.currentPage = 1;

		this.options.router.navigate('legends/'+this.collection.currentPage+
			(event.searchQuery && event.searchQuery != "" ? '/search/'+event.searchQuery : '')+
			(event.tags && event.tags.length > 0 ? '/tags/'+_.pluck(event.tags, 'id').join(';') : '')+
			(event.collection && event.collection != "" ? '/collection/'+event.collection : '')+
			(event.personCounty && event.personCounty != "" ? '/person_county/'+event.personCounty : '')+
			(event.personMunicipality && event.personMunicipality != "" ? '/person_municipality/'+event.personMunicipality : '')+
			(event.personGender && event.personGender != "" ? '/person_gender/'+event.personGender : '')+
			(event.personRelation && event.personRelation != "" ? '/person_relation/'+event.personRelation : '')+
			(event.manuscript && event.manuscript != "" ? '/manuscript/'+event.manuscript : '')
		, {
			trigger: true
		});
	},

	updateMetadata: function() {
		if (this.collection.metadata.get('page') != undefined) {
			this.$el.find('.page-info').html((Number(this.collection.metadata.get('page'))+200)+' / '+this.collection.metadata.get('total'));
		}
	},

	getLegends: function(page, searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript) {
		this.collection.getLegends(page == null ? 1 : page, searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript);

		if (searchQuery == null && tags == null && collection == null && personCounty == null && personMunicipality == null && personGender == null && personRelation == null && manuscript == null) {
			this.mapView.clearMap();

			this.$el.find('.legends-map').addClass('u-hidden');
		}
		else {
			this.mapView.getPlaces('legends', {
				search: searchQuery,
				tags: tags,
				collection: collection,
				county: personCounty,
				municipality: personMunicipality,
				gender: personGender,
				relation: personRelation,
				manuscript: manuscript
			});

			this.$el.find('.legends-map').removeClass('u-hidden');
		}

		this.keywordRelationView.getRelations(searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript);
		this.sourceRelationView.getRelations(searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript);
		this.yearsRelationView.getRelations(searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript);

		this.searchForm.setFormValues({
			searchQuery: searchQuery,
			tags: tags,
			collection: collection,
			personCounty: personCounty,
			personMunicipality: personMunicipality,
			personGender: personGender,
			personRelation: personRelation,
			manuscript: manuscript
		});
	},

	render: function() {
		if (this.options.route) {
			this.options.router.navigate('/legends/'+this.collection.currentPage);
		}

		this.renderList();

		return this;
	},

	renderList: function() {
		var template = _.template($("#legendListTemplate").html());

		this.$el.find('.list-container').html(template({
			models: this.collection.models
		}));

		this.$el.find('.legends-number').html(this.collection.metadata.get('total')+' sagnir fundust');
	}
});
