var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DataModel = require('./../models/DataModel');

module.exports = Backbone.Collection.extend({
	model: DataModel,
	urlBase: '/grunnur/api/legends',

	initialize: function(options) {
		this.metadata = new Backbone.Model();
	},

	parse: function(data) {
		this.metadata.set(data.meta);
		
		return data.data ? data.data : data;
	},

	search: function(query) {
		this.searchQuery = query;
		this.url = this.urlBase+'/search/'+query;

		this.fetch({
			reset: true
		});
	},

	getLegends: function(page, searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript) {
		this.currentPage = page;
		this.url = this.urlBase+'/'+
			((this.currentPage-1)*200)+'/200'+
			(searchQuery != null ? '/search/'+searchQuery : '')+
			(tags != null ? '/tags/'+tags : '')+
			(collection != null ? '/collection/'+collection : '')+
			(personCounty != null ? '/person_county/'+personCounty : '')+
			(personMunicipality != null ? '/person_municipality/'+personMunicipality : '')+
			(personGender != null ? '/person_gender/'+personGender : '')+
			(personRelation != null ? '/person_relation/'+personRelation : '')+
			(manuscript != null ? '/manuscript/'+manuscript : '')
		;
		this.fetch({
			reset: true
		});
	}
});