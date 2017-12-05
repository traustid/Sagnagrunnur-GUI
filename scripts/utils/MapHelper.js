require('../lib/leaflet');

module.exports = {
	greenIcon: L.icon({
		iconUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/leaflet/marker-icon-green-2x.png',
		iconRetinaUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/leaflet/marker-icon-green.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/leaflet/marker-shadow.png',
		shadowSize: [41, 41]
	}),

	orangeIcon: L.icon({
		iconUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/leaflet/marker-icon-orange-2x.png',
		iconRetinaUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/leaflet/marker-icon-orange.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/leaflet/marker-shadow.png',
		shadowSize: [41, 41]
	}),

	smallIconBlue: L.icon({
		iconUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-blue.png',
		shadowUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-shadow.png',
		iconSize:     [15, 23],
		shadowSize:   [14, 10],
		iconAnchor:   [8, 22],
		shadowAnchor: [8, 22],
		popupAnchor:  [-1, -15]
	}),

	smallIconOrange: L.icon({
		iconUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-orange.png',
		shadowUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-shadow.png',
		iconSize:     [15, 23],
		shadowSize:   [14, 10],
		iconAnchor:   [8, 22],
		shadowAnchor: [8, 22],
		popupAnchor:  [-1, -15]
	}),

	smallIconGreen: L.icon({
		iconUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-green.png',
		shadowUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-shadow.png',
		iconSize:     [15, 23],
		shadowSize:   [14, 10],
		iconAnchor:   [8, 22],
		shadowAnchor: [8, 22],
		popupAnchor:  [-1, -15]
	}),

	smallIconGray: L.icon({
		iconUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-gray.png',
		shadowUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-shadow.png',
		iconSize:     [15, 23],
		shadowSize:   [14, 10],
		iconAnchor:   [8, 22],
		shadowAnchor: [8, 22],
		popupAnchor:  [-1, -15]
	}),

	smallIconPink: L.icon({
		iconUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-pink.png',
		shadowUrl: (window.sgImageUrl ? window.sgImageUrl : '')+'images/small-markers/map-marker-shadow.png',
		iconSize:     [15, 23],
		shadowSize:   [14, 10],
		iconAnchor:   [8, 22],
		shadowAnchor: [8, 22],
		popupAnchor:  [-1, -15]
	}),

	createDivIcon: function(color, smallIcon) {
		return L.divIcon({
			iconAnchor: smallIcon ? [3, 3] : [6, 6],	
			html: '<div class="circle-icon'+
				(color ? ' '+color : '')+
				(smallIcon ? ' small' : '')+
				'"></div>'
		});
	}
};