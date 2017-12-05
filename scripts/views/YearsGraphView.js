var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet');

var DataListView = require('./DataListView');
var DataCollection = require('../collections/DataCollection');
var MapView = require('./MapView');
var GraphView = require('./GraphView');
var KeywordRelationsCollection = require('./../collections/KeywordRelationsCollection');

module.exports = DataListView.extend({
	urlBase: '/grunnur/api/relations/persons_years',

	initialize: function(options) {
		this.options = options;

		this.render();

		this.collection = new DataCollection();
		this.collection.on('reset', this.updateGraphs, this);
	},

	getRelations: function(searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript) {
		this.$el.addClass('loading');

		this.collection.url = this.urlBase+
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

	updateGraphs: function() {
		console.log(this.collection);
		this.informantsGraph.setData(this.collection.at(0).get('informants'));
	},

	render: function() {
		this.$el.removeClass('loading');
		
		var template = _.template('<div class="informants-graph"><div class="graph-container"><svg width="100%" height="200"></svg><div class="info-overlay"></div><div class="no-results-overlay"><span class="label">No results</span></div><div class="loading-overlay"></div><div class="graph-legends">	<div class="legend">		<span class="color" style="background-color: #0022FF"></span> Birth years	</div>	<div class="legend">		<span class="color" style="background-color: #D97600"></span> Death years	</div></div></div></div>');

		this.$el.html(template());

		this.informantsGraph = new GraphView({
			el: this.$el.find('.informants-graph')
		});
	}
});