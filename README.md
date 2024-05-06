# gridfilter.js: Filter grid items

*DEPRICATION WARNING: the functionality in this script has been superceeded / trivialised by updated web standards.*

Filters items arranged in a grid by category.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="css/filter.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="js/gridfilter.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'js/filter.js'
], function(GridFilter) {
	...
});
```

Or use imported as a component in existing projects.

```js
@import {GridFilter} from "js/gridfilter.js";
```

## How to start the script

```javascript
var gridFilter = new GridFilter({
	'buttons': document.querySelectorAll('.grid-filter button'),
	'container': document.querySelector('.filter-grid'),
	'items': document.querySelectorAll('.filter-grid li'),
	'nothing': document.querySelector('.filter-grid .nothing')
});
```

**buttons : {DOM objects}** - The buttons to apply the filters.

**container : {string}** - The container of the filtered items.

**items : {string}** - The items to be filtered.

**nothing : {string}** - A container containing a message in case no match was found.

### Match

```javascript
gridFilter.filter(text);
```

Perform an ad hoc search.

**text : {CSS class}** - A CSS class to filter on.

## How to test the script

These test uses Selenium from http://docs.seleniumhq.org/

+ `npm install webdriverjs` - Installs the webdriver prerequisite.
+ `npm install mocha -g` - Installs the prerequisite test framework.
+ `java -jar /Applications/Selenium/selenium-server-standalone-2.42.2.jar` - Starts Selenium.
+ `mocha` - Runs the automated tests.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens).
