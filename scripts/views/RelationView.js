var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet');

var DataListView = require('./DataListView');
var MapView = require('./MapView');
var KeywordRelationsCollection = require('./../collections/KeywordRelationsCollection');

module.exports = DataListView.extend({
	urlBase: '/grunnur/api/relations/',

	initialize: function(options) {
		this.options = options;

		this.collection = new KeywordRelationsCollection();
		this.collection.on('reset', this.render, this);
	},

	getRelations: function(searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript) {
		this.$el.addClass('loading');

		this.collection.url = this.urlBase+this.options.type+
			(tags != null ? '/tags/'+tags : '')+
			(searchQuery != null ? '/search/'+searchQuery : '')+
			(collection != null ? '/collection/'+collection : '')+
			(personCounty != null ? '/person_county/'+personCounty : '')+
			(personMunicipality != null ? '/person_municipality/'+personMunicipality : '')+
			(personGender != null ? '/person_gender/'+personGender : '')+
			(personRelation != null ? '/person_relation/'+personRelation : '')+
			(manuscript != null ? '/manuscript/'+manuscript : '')
		;

		this.collection.fetch({
			reset: true
		});
	},

	render: function() {
		this.$el.removeClass('loading');
		
		var template = _.template($("#relationTemplate").html());

		this.$el.html(template({
			models: this.collection.models,
			metadata: this.collection.metadata,
			maxValue: this.collection.at(0).get('count'),
			disableLinks: this.options.disableLinks
		}));
	}
});