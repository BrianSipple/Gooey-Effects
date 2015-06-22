(function (exports) {

    var docRoot = document.documentElement,
        dummyElement = document.createElement('div');


    /**
     * Performs feature detection for a property, then
     * adds it to the roo documentElement a la Modernizr
     */
    var testStylePropSupport = function testStylePropSupport (property) {

        if (property in docRoot.style) {
            docRoot.classList.add(property.toLowerCase());
            return true;
        } else {
            docRoot.classList.add('no-' + property.toLowerCase());
            return false;
        }
    };

    /**
     * Perform feature detection for style property values by setting
     * attaching the property to a dummy element, setting it to the value under test,
     * then checking so see whether the browser retained the value.
     */
    var testStyleValueSupport = function testStyleProperty (id, prop, value) {

        dummyElement.style[prop] = value;

        if (dummyElement.style[prop]) {
            docRoot.classList.add(id);
            return true;
        }

        docRoot.classList.add('no-' + id);
        return false;
    };


    /**
     * Set the filter property for an element, accounting for both
     * 'webkitFilter' and 'filter'
     *
     * Example: setFilter('url("/svg/filters/gooey-effects.svg#goo")', menuContainerElem);
     */
    var setFilter = function setFilter (path, elem) {
        elem.style.filter = path;
        elem.style.webkitFilter = path;
        elem.style.mozFilter = path;
    };

    var removeFilter = function removeFilter (elem) {
        elem.style.filter = '';
        elem.style.webkitFilter = '';
        elem.style.mozFilter = '';
    };

    var api = {
        testStylePropSupport: testStylePropSupport,
        testStyleValueSupport: testStyleValueSupport,
        setFilter: setFilter,
        removeFilter: removeFilter
    };

    BS.compose(exports, api);

}(typeof exports === 'undefined' ? window : exports));



