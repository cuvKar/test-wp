/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
import 'slick-carousel';
import '@popperjs/core';

try {

    window.$ = window.jQuery = require('jquery');

    /**
     * Get Bootstrap
     */
    window.bootstrap = require('bootstrap');

    /**
     * JS Cookie
     */
    window.Cookies = require('js-cookie');

    /**
     * Custom Plugins / Components
     */
    require('./plugins/exists.js');

} catch (e) {

}
