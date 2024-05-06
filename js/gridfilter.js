/*
	Source:
	van Creij, Maurice (2019). "gridfilter.js: Filter grid items", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var GridFilter = function (config) {

	// PROPERTIES

	var _this = this;
	this.config = config;

	// METHODS

	this.resetFilters = function() {
		// reset the filter buttons
		this.config.buttons.forEach(function(filter) {
			filter.className = filter.className.replace(/ is-checked/g, '');
		});
		// reset the filter items
		this.config.items.forEach(function(item) {
			item.className = item.className.replace(/ is-visible/g, ' before-invisible');
		});
	};

	this.animateItems = function() {
		this.config.items.forEach(function(item) {
			// transition to the finished state
			item.className = item.className.replace(/ before-invisible/g, ' is-invisible');
			item.className = item.className.replace(/ before-visible/g, ' is-visible');
		});
	};

	this.onFilterClicked = function(filter, evt) {
		// reset the filters
		this.resetFilters();
		// re-apply the filters
		var filterClass = filter.getAttribute('data-filter');
		var filteredItems = (filterClass) ? this.config.container.querySelectorAll(filterClass) : this.config.items;
		filteredItems.forEach(function(item) {
			item.className = item.className.replace(/ before-invisible/g, ' is-visible');
			if (!/is-visible/.test(item.className)) item.className = item.className.replace(/ before-visible/g, '') + ' before-visible';
		});
		// activate the button
		filter.className += ' is-checked';
		// show or hide the no-results message
		console.log('this.config.nothing', this.config.nothing, filteredItems.length);
		if (this.config.nothing) this.config.nothing.style.display = (filteredItems.length == 0) ? null : 'none';
		// trigger the transitions
		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.animateItems.bind(this), 100);
	};

	this.onItemTransitioned = function(item, evt) {
		// hide the invisible items
		item.className = item.className.replace(/ is-invisible/g, '');
	};

	// PUBLIC

	this.filter = function(value) {
		// perform an ad hoc search
		this.onFilterClicked({'getAttribute': function() { return value; }});
	};

	// EVENTS

	this.config.buttons.forEach(function(filter) {
		filter.addEventListener('click', _this.onFilterClicked.bind(_this, filter));
	});

	this.config.items.forEach(function(item) {
		item.addEventListener('transitionend', _this.onItemTransitioned.bind(_this, item));
	});

	this.onFilterClicked(this.config.buttons[0]);

};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return GridFilter });
if (typeof module != 'undefined') module.exports = GridFilter;
