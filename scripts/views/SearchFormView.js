var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

var DropdownView = require('./DropdownView');
var TagSelectView = require('./TagSelectView');

module.exports = Backbone.View.extend({
	initialize: function(options) {
		this.options = options;

		this.controlPersonCounty = this.$el.find('.search-form-person-county');
		this.controlSearchQuery = this.$el.find('.search-form-search-query');
		this.controlCollection = this.$el.find('.search-form-collection');
		this.controlPersonMunicipality = this.$el.find('.search-form-person-municipality');
		this.controlPersonGender = this.$el.find('.search-form-person-gender');
		this.controlPersonRelation = this.$el.find('.search-form-person-relation');
		this.controlManuscript = this.$el.find('.search-form-manuscript');

		this.controlPersonCounty.change(_.bind(this.searchCountyChange, this));

		this.controlPersonRelation.change(_.bind(function() {
			var value = this.controlPersonRelation.val();

			this.updatePersonLabels();
		}, this));

		this.$el.find('.search-button').click(_.bind(this.triggerSearch, this));
		this.$el.find('input[type="text"]').keyup(_.bind(function(event) {
			if (event.keyCode == 13) {
				this.triggerSearch();
			}
		}, this));

		_.each(this.$el.find('.dropdown-control'), _.bind(function(control) {
			new DropdownView({
				el: $(control)
			});
		}, this));

		this.tagSelectView = new TagSelectView({
			el: this.$el.find('.search-form-tag-select')
		});
	},

	triggerSearch: function() {
		this.explainSearch();

		this.trigger('search', {
			searchQuery: this.controlSearchQuery.val(),
			tags: this.tagSelectView.selectedTags,
			collection: this.controlCollection.val(),
			personCounty: this.controlPersonCounty.val(),
			personMunicipality: this.controlPersonMunicipality.val(),
			personGender: this.controlPersonGender.val(),
			personRelation: this.controlPersonRelation.val(),
			manuscript: this.controlManuscript.val()
		});
	},

	updatePersonLabels: function() {
		var relationValue = this.controlPersonRelation.val();
		if (relationValue == 'h') {
			this.$el.find('.person-definition-label').html('heimildamanns');
		}
		else if (relationValue == 'sk') {
			this.$el.find('.person-definition-label').html('skráningamanns');
		}
		else {
			this.$el.find('.person-definition-label').html('einstaklings');
		}
	},

	searchCountyChange: function(event, setMunicipality) {
		var selectedCounty = this.controlPersonCounty.val();

		if (selectedCounty > 0) {
			var municipalitiesCollection = new Backbone.Collection();

			municipalitiesCollection.url = '/grunnur/api/keyplaces/municipalities/county/'+selectedCounty;
			municipalitiesCollection.on('reset', _.bind(function() {
				this.controlPersonMunicipality.html('<option value=""></option>'+
					_.map(municipalitiesCollection.models, _.bind(function(model) {
						return '<option value="'+model.get('key')+'">'+model.get('name')+'</option>';
					}, this)));

				if (setMunicipality) {
					this.controlPersonMunicipality.val(setMunicipality);
				}
			}, this));
			municipalitiesCollection.fetch({
				reset: true
			});
		}
		else {
			this.controlPersonMunicipality.html('<option value=""></option>');			
		}
	},

	setFormValues: function(values) {
		console.log(values);
		if (values.searchQuery != this.controlSearchQuery.val()) {
			this.controlSearchQuery.val(values.searchQuery);
		}

		if (values.tags && values.tags.length > 0) {		
			this.tagSelectView.setInitalTags(_.map(values.tags.split(';'), function(tag) {
				return Number(tag);
			}));
		}

		if (values.collection != this.controlCollection.val()) {
			this.controlCollection.val(values.collection);
		}
		if (values.personRelation != this.controlPersonRelation.val()) {
			this.controlPersonRelation.val(values.personRelation);

			this.updatePersonLabels();
		}
		if (values.personCounty != this.controlPersonCounty.val()) {
			this.controlPersonCounty.val(values.personCounty);

			this.searchCountyChange(null, values.personMunicipality ? values.personMunicipality : null);
		}
		if (values.personGender != this.controlPersonGender.val()) {
			this.controlPersonGender.val(values.personGender);
		}
		if (values.manuscript != this.controlManuscript.val()) {
			this.controlManuscript.val(values.manuscript);
		}

		this.explainSearch();
	},

	describeList: function(terms, quotate) {
		if (terms.length > 1) {
			return (quotate ? '"' : '')+terms.slice(0, -1).join(quotate ? '", "' : ', ')+(quotate ? '" og "' : ' og ')+terms.slice(-1)+(quotate ? '"' : '');
		}
		else if (terms.length == 1) {
			return (quotate ? '"' : '')+terms[0]+(quotate ? '"' : '');
		}
		else {
			return '';
		}
	},

	explainSearch: function() {
		var explanationTerms = [];

		var explanation = '';

		if (this.tagSelectView.selectedTags.length == 0 && this.controlSearchQuery.val() == '' && this.controlCollection.val() == '' && this.controlPersonCounty.val() == '' && this.controlPersonMunicipality.val() == '' && this.controlPersonGender.val() == '' && this.controlManuscript.val() == '') {
			explanation = 'Allar sagnir. Niðurstöður á korti sjást aðeins ef leit er þrengd.'
		}
		else {
			if (this.controlSearchQuery.val() != '') {
				explanationTerms.push('þar sem heiti eða útdráttur inniheldur orðið "'+this.controlSearchQuery.val()+'"');
			}
			if (this.tagSelectView.selectedTags.length > 0) {
				explanationTerms.push('sem innihalda '+(this.tagSelectView.selectedTags.length == 1 ? 'efnisorðið ' : 'efnisorðin ')+this.describeList(_.pluck(this.tagSelectView.selectedTags, 'tag'), true));
			}
			if (this.controlCollection.val() != '') {
				explanationTerms.push('sem koma úr þjóðsagnasafninu "'+this.controlCollection.find('option:selected').text()+'"');
			}

			var personDefinitionNominative = this.controlPersonRelation.val() == 'sk' ? 'skrásetjari' : this.controlPersonRelation.val() == 'h' ? 'heimildamaður' : 'heimildamaður eða skrásetjari';
			var personDefinitionAccusative = this.controlPersonRelation.val() == 'sk' ? 'skrásetjara' : this.controlPersonRelation.val() == 'h' ? 'heimildamanns' : 'heimildamanns eða skrásetjara';

			if (this.controlPersonCounty.val() != '') {
				explanationTerms.push('þar sem búsetusýsla '+personDefinitionAccusative+' er '+this.controlPersonCounty.find('option:selected').text());
			}

			if (this.controlPersonMunicipality.val() != '') {
				explanationTerms.push('þar sem búsetuhreppur '+personDefinitionAccusative+' er '+this.controlPersonMunicipality.find('option:selected').text());
			}

			if (this.controlPersonGender.val() != '') {
				explanationTerms.push('þar sem '+personDefinitionNominative+' er '+this.controlPersonGender.find('option:selected').text().toLowerCase());
			}

			if (this.controlManuscript.val() != '') {
				explanationTerms.push('sem finnast í handritinu "'+this.controlManuscript.val()+'"');
			}

			explanation = 'Niðurstöður leitar að sögnum '+this.describeList(explanationTerms)+'.';
		}

		this.trigger('explanation', {
			explanation: explanation
		});
	}
});
