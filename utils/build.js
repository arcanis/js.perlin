var fs = require( 'fs' );

var Glob = require( 'glob' );
var UglifyJS = require( 'uglify-js' );

var uglifySourceCode = function ( sources ) {
    return UglifyJS
        .minify( sources, {
            compress : true } ).code; };

fs.writeFileSync( 'build/Perlin.js',
    uglifySourceCode( Glob.sync( 'src/**/*.js' ) ) );
