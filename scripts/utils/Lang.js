window.l = {
	langs: require('./LangData'),
	defaultLang: 'is',

	get: function(phrase) {
		if (!this.currentLang) {
			this.currentLang = /*localStorage.getItem('lang') || */'is';
		}
		return this.currentLang == this.defaultLang ? phrase : this.langs[this.currentLang][phrase];
	}
};