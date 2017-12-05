var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
require('../lib/leaflet');
var RouteParser = require('route-parser');

var AppRouter = require('./../router/AppRouter');

L.Icon.Default.imagePath = 'http://sagnagrunnur.com/s/images/leaflet';

module.exports = Backbone.View.extend({
	initialize: function() {
		this.render();

		this.router = new AppRouter();
		this.router.on('route:default', _.bind(function() {
			this.beforeShowView();
			this.showLegendListView();
		}, this));

		this.router.on('route:persons', _.bind(function(page, searchQuery) {
			this.beforeShowView();
			this.showPersonListView(page, searchQuery);
		}, this));

		this.router.on('route:person', _.bind(function(personId) {
			this.beforeShowView();
			this.showPersonView(personId);
		}, this));

		this.router.on('route:places', _.bind(function(page, searchQuery) {
			this.beforeShowView();
			this.showPlaceListView(page, searchQuery);
		}, this));

		this.router.on('route:placesByCounty', _.bind(function(county) {
			this.beforeShowView();
			this.showPlaceListView(null, null, null, null, county);
		}, this));

		this.router.on('route:placesByMunicipality', _.bind(function(municipality) {
			this.beforeShowView();
			this.showPlaceListView(null, null, null, null, null, municipality);
		}, this));

		this.router.on('route:place', _.bind(function(placeId) {
			this.beforeShowView();
			this.showPlaceView(placeId);
		}, this));

		this.router.on('route:legends', _.bind(function(page, searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript) {
			this.beforeShowView();
			this.showLegendListView(page, searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript);
		}, this));

		this.router.on('route:legend', _.bind(function(legendId) {
			this.beforeShowView();
			this.showLegendView(legendId);
		}, this));

		this.router.on('route:tales', _.bind(function(page, order) {
			this.beforeShowView();
			this.showTalesListView(page, order);
		}, this));

		this.router.on('route:talesearch', _.bind(function(searchQuery) {
			this.beforeShowView();
			this.showTalesListView(null, null, null, searchQuery);
		}, this));

		this.router.on('route:talesByAt', _.bind(function(atNumber) {
			this.beforeShowView();
			this.showTalesListView(null, null, null, null, atNumber);
		}, this));

		this.router.on('route:talesByCategory', _.bind(function(category) {
			this.beforeShowView();
			this.showTalesListView(null, null, null, null, null, category);
		}, this));

		this.router.on('route:tale', _.bind(function(taleId) {
			this.beforeShowView();
			this.showTaleView(taleId);
		}, this));

		this.router.on('route:manuscript', _.bind(function(manuscriptId, msitem) {
			this.beforeShowView();
			this.showManuscriptView(manuscriptId, msitem);
		}, this));

		this.router.on('route:mapLegends', _.bind(function() {
			var route = new RouteParser(this.router.routeStrings.mapLegends);
			var params = route.match(window.location.hash.substr(1));

			this.beforeShowView();
			this.showMapView('legends', params);
		}, this));

		this.router.on('route:keywords', _.bind(function() {
			this.beforeShowView();
			this.showKeywordListView();
		}, this));

		this.router.on('route:letters', _.bind(function(personId, dateFrom, dateTo) {
			this.beforeShowView();
			this.showLettersView(personId, dateFrom, dateTo);
		}, this));

		this.router.on('route:letter', _.bind(function(letterId) {
			this.beforeShowView();
			this.showLetterView(letterId);
		}, this));

		Backbone.history.start();
	},

	showMessage: function(msg) {
		this.$el.find('.overlay-container').html('<div class="message">'+msg+'</div>');
		setTimeout(_.bind(function() {
			this.$el.find('.overlay-container').html('');
		}, this), 1500);
	},

	beforeShowView: function() {
		this.$el.find('.overlay-container').html('');
		$(document.body).removeClass('has-overlay');
		$('html,body').scrollTop(0);
	},

	showLegendListView: function(page, searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript) {
		if (this.currentView != 'LegendListView') {
			this.currentView = 'LegendListView';

			var LegendListView = require('./LegendListView');
			if (this.mainView != null) {
				this.mainView.destroy();
			}

			this.mainView = new LegendListView({
				el: this.$el.find('.view-container'),
				router: this.router,
				app: this
			});
			this.mainView.on('page', _.bind(function(event) {
				var route = new RouteParser('legends(/:page)(/tags/:tags)(/collection/:collection)(/person_county/:county)(/person_municipality/:municipality)(/person_gender/:gender)(/person_relation/:relation)(/manuscript/:manuscript)');
				var routeParams = route.match(window.location.hash.substr(1));
				routeParams.page = event.page;

				this.router.navigate(route.reverse(routeParams), {
					trigger: true
				});
			}, this));
		}

		this.mainView.getLegends(page == null ? 1 : page, searchQuery, tags, collection, personCounty, personMunicipality, personGender, personRelation, manuscript);
	},

	showTalesListView: function(page, order, orderDir, searchQuery, atNumber, category) {
		if (this.currentView != 'TalesListView') {
			this.currentView = 'TalesListView';

			var TalesListView = require('./TalesListView');
			if (this.mainView != null) {
				this.mainView.destroy();
			}

			this.mainView = new TalesListView({
				el: this.$el.find('.view-container'),
				router: this.router,
				page: page == null ? 1 : page,
				order: order == null ? '' : order,
				orderDir: orderDir == null ? '' : orderDir,
				searchQuery: searchQuery == null ? '' : searchQuery,
				atNumber: atNumber == null ? '' : atNumber,
				category: category == null ? '' : category,
				app: this
			});
			this.mainView.on('page', _.bind(function(event) {
				this.router.navigate('tales/'+event.page, {
					trigger: true
				});
			}, this));
		}
		else {
			if (searchQuery != null) {
				this.mainView.collection.search(searchQuery);
			}
			else if (atNumber != null) {
				this.mainView.collection.talesByAt(atNumber);
			}
			else if (category != null) {
				this.mainView.collection.talesByCategory(category);
			}
			else {
				this.mainView.collection.getPage(page == null ? 1 : page);
			}
		}
	},

	showPersonListView: function(page, searchQuery) {
		if (this.currentView != 'PersonListView') {
			this.currentView = 'PersonListView';

			var PersonListView = require('./PersonListView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}
			this.mainView = new PersonListView({
				el: this.$el.find('.view-container'),
				router: this.router,
				app: this
			});
			this.mainView.on('page', _.bind(function(event) {
				this.router.navigate('persons/'+event.page, {
					trigger: true
				});
			}, this));
		}
		this.mainView.collection.getPersons(page == undefined ? 1 : page, searchQuery);
	},

	showPlaceListView: function(page, searchQuery, county, municipality) {
		if (this.currentView != 'PlaceListView') {
			this.currentView = 'PlaceListView';

			var PlaceListView = require('./PlaceListView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}

			this.mainView = new PlaceListView({
				el: this.$el.find('.view-container'),
				router: this.router,
				app: this
			});
			this.mainView.on('page', _.bind(function(event) {
				this.router.navigate('places/'+event.page, {
					trigger: true
				});
			}, this));
		}
		this.mainView.collection.getPlaces(page == undefined ? 1 : page, searchQuery);
	},

	showKeywordListView: function() {
		if (this.currentView != 'KeywordListView') {
			this.currentView = 'KeywordListView';

			var KeywordListView = require('./KeywordListView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}

			this.mainView = new KeywordListView({
				el: this.$el.find('.view-container')
			});
			this.mainView.on('page', _.bind(function(event) {
				this.router.navigate('places/'+event.page, {
					trigger: true
				});
			}, this));
		}
		else {
		}
	},

	showLettersView: function(personId, dateFrom, dateTo) {
		if (this.currentView != 'LettersView') {
			this.currentView = 'LettersView';

			var LettersView = require('./LettersView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}
			this.mainView = new LettersView({
				el: this.$el.find('.view-container'),
				personId: personId,
				dateFrom: dateFrom,
				dateTo: dateTo,
				router: this.router,
				app: this
			});
		}
		else {
			this.mainView.collection.getPeriod(personId, dateFrom, dateTo);
		}
	},

	showLetterView: function(letterId) {
		if (this.currentView != 'LetterView') {
			this.currentView = 'LetterView';

			var LetterView = require('./LetterView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}
			this.mainView = new LetterView({
				el: this.$el.find('.view-container'),
				letterId: letterId,
				router: this.router,
				app: this
			});
		}
		else {
		}
	},

	showPlaceView: function(placeId) {
		if (this.currentView != 'PlaceView') {
			this.currentView = 'PlaceView';

			var PlaceView = require('./PlaceView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}
			this.mainView = new PlaceView({
				el: this.$el.find('.view-container'),
				placeId: placeId,
				router: this.router,
				app: this
			});
		}
		else {
			this.mainView.getPlace(placeId);
		}
	},

	showPersonView: function(personId) {
		if (this.currentView != 'PersonView') {
			this.currentView = 'PersonView';

			var PersonView = require('./PersonView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}
			this.mainView = new PersonView({
				el: this.$el.find('.view-container'),
				personId: personId,
				router: this.router,
				app: this
			});
		}
		else {
			this.mainView.getPerson(personId);
		}
	},

	showLegendView: function(legendId) {
		if (this.currentView != 'LegendView') {
			this.currentView = 'LegendView';

			var LegendView = require('./LegendView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}
			this.mainView = new LegendView({
				el: this.$el.find('.view-container'),
				legendId: legendId,
				router: this.router,
				app: this
			});
		}
		else {
			this.mainView.getLegend(legendId);
		}
	},

	showTaleView: function(taleId) {
		if (this.currentView != 'TaleView') {
			this.currentView = 'TaleView';

			var TaleView = require('./TaleView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}
			this.mainView = new TaleView({
				el: this.$el.find('.view-container'),
				taleId: taleId,
				router: this.router,
				app: this
			});
		}
	},

	showManuscriptView: function(manuscriptId, msitem) {
		if (this.currentView != 'ManuscriptView') {
			this.currentView = 'ManuscriptView';

			var ManuscriptView = require('./ManuscriptView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}
			this.mainView = new ManuscriptView({
				el: this.$el.find('.view-container'),
				manuscriptId: manuscriptId,
				msitem: msitem,
				router: this.router,
				app: this
			});
		}
	},

	showMapView: function(mapType, params) {
		if (this.currentView != 'MapPageView') {
			this.currentView = 'MapPageView';

			var MapPageView = require('./MapPageView');
			if (this.mainView != undefined) {
				this.mainView.destroy();
			}
			this.mainView = new MapPageView({
				el: this.$el.find('.view-container'),
				router: this.router
			});
		}
		this.mainView.collection.getPlaces(mapType, params);
	},

	render: function() {
		var template = _.template($("#appTemplate").html());

		this.$el.html(template());

		$(window).click(_.bind(function() {
			this.$el.find('.dropdown-control').removeClass('open');
		}, this));

		return this;
	}
});
