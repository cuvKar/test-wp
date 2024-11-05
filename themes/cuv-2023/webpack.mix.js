const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */
mix.setPublicPath('public')
    .options({
        processCssUrls: false
    })
    //.sass('assets/scss/admin/app.scss', 'css/admin.css')
    .sass('assets/scss/frontend/app.scss', 'css/frontend.css')
    .js([
        'assets/js/frontend/before.js',
        'assets/js/frontend/app.js',
        'assets/js/frontend/after.js'
    ], 'js/frontend.js')
    //.js([
        //'assets/js/admin/before.js',
        //'assets/js/admin/app.js',
        //'assets/js/admin/after.js'
    //], 'js/admin.js')
    .extract([
        'bootstrap',
        'popper.js',
        'js-cookie',
        'slick-carousel',
        '@fortawesome/fontawesome-free'
    ])
    .browserSync({
        proxy: 'localhost/Clinuvel'
    })    
    .sourceMaps()
    .copyDirectory(
        'node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts'
    )
    .copy(
        'node_modules/slick-carousel/slick/ajax-loader.gif', 'public/img/gif',
    )
    .copy(
        'node_modules/slick-carousel/slick/fonts/*', 'public/webfonts/slick'
    )
    .webpackConfig({
        externals: {
            'jquery': 'jQuery'
        },
        stats: {
            assets: true,
            children: true,
            chunks: false,
            errors: true,
            errorDetails: true,
            modules: false,
            timings: true,
            colors: true
        }
    });

if (mix.inProduction()) {
    mix.version().sourceMaps();
} else {
    mix.version();
    mix.webpackConfig({
        devtool: 'inline-source-map'
    });
}
