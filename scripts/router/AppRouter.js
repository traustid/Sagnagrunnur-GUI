var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

module.exports = Backbone.Router.extend({
	routeStrings: {
		mapLegends: 'map/legends(/search/:search)(/tags/:tags)(/collection/:collection)(/person_county/:county)(/person_municipality/:municipality)(/person_gender/:gender)(/person_relation/:relation)(/manuscript/:manuscript)'
	},

	routes: {
		'': 'default',

		'places/county/:county': 'placesByCounty',
		'places/municipality/:municipality': 'placesByMunicipality',
		'places(/:page)(/search/:search)': 'places',

		'place/:id': 'place',

		'persons(/:page)(/search/:search)': 'persons',

		'person/:id': 'person',

		'legends/search/:query': 'legendsearch',
		'legends/keyword/:keyword': 'legendsByKeyword',
		'legends(/:page)(/search/:search)(/tags/:tags)(/collection/:collection)(/person_county/:county)(/person_municipality/:municipality)(/person_gender/:gender)(/person_relation/:relation)(/manuscript/:manuscript)': 'legends',

		'legend/:id': 'legend',

		'keywords': 'keywords',
		'keyword/:id': 'keyword',

		'tales/at/:at': 'talesByAt',
		'tales/search/:query': 'talesearch',
		'tales/category/:category': 'talesByCategory',
		'tales(/:page)(/:order)(/:orderdir)': 'tales',

		'tale/:id': 'tale',

		'manuscript/:id(/:msitem)': 'manuscript',

		'map/legends(/tags/:tags)(/collection/:collection)(/informants_county/:county)(/informants_municipality/:municipality)(/informants_gender/:gender)': 'mapLegends',
		'map/homes(/gender/:gender)(/collection/:collection)(/legends_county/:county)(/legends_tags/:tags)': 'mapHomes',

		'letters/:person_id(/datefrom/:datefrom/dateto/:dateto)': 'letters',
		'letter/:letter': 'letter'
	}
});