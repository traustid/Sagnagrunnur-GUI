var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

require('./utils/Lang');

$(function() {
	if ($('#appView').length > 0) {
		var AppView = require('./views/AppView');
		window.appView = new AppView({
			el: $('#appView')
		});
	}

	if ($('.sg-wp-container').length > 0) {
		_.each($('.sg-wp-container'), _.bind(function(sgItem) {
			if ($(sgItem).hasClass('person-view')) {
				var PersonView = require('./views/PersonView');

				var personView = new PersonView({
					el: $(sgItem).find('.view-container'),
					personId: $(sgItem).data('id')
				});				
			}

			if ($(sgItem).hasClass('legend-view')) {
				var LegendView = require('./views/LegendView');

				var legendView = new LegendView({
					el: $(sgItem).find('.view-container'),
					legendId: $(sgItem).data('id')
				});			
			}

			if ($(sgItem).hasClass('place-view')) {
				var PlaceView = require('./views/PlaceView');

				var placeView = new PlaceView({
					el: $(sgItem).find('.view-container'),
					placeId: $(sgItem).data('id')
				});
			}

			if ($(sgItem).hasClass('letters-view')) {
				(function() {
					var AppRouter = require('./router/AppRouter');

					var showLettersView = function() {
						var LettersView = require('./views/LettersView');
	
						var LettersView = new LettersView({
							el: $(sgItem).find('.view-container'),
							personId: $(sgItem).data('id')
						});
					}

					var showLetterView = function(letterId) {
						var LetterView = require('./views/LetterView');

						if (this.mainView != undefined) {
							this.mainView.destroy();
						}
						this.mainView = new LetterView({
							el: $(sgItem).find('.view-container'),
							letterId: letterId,
							router: router,
							app: this
						});
					}

					var router = new AppRouter();

					router.on('route', function(event, data) {
						if (event == 'default') {
							showLettersView();
						}
						if (event == 'letter') {
							var letterId = data[0];

							showLetterView(letterId);
						}
					});

					Backbone.history.start();
				})();
			}
		}, this));
	}

	console.log('Sagnagrunnur:main.js');
});
