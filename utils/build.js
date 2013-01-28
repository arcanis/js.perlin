var fs = require( 'fs' );

var ExecSync = require( 'execSync' );
var Glob     = require( 'glob' );
var UglifyJS = require( 'uglify-js' );

var uglifySourceCode = function ( sources ) {
    return UglifyJS
        .minify( sources, {
            compress : true } ).code; };

fs.writeFileSync( 'build/Perlin.js',
    uglifySourceCode( Glob.sync( 'src/**/*.js' ) ) +
    'PERLIN.WebGLGenerator.vShaderScript=' +
        JSON.stringify( ExecSync.stdout( 'glslmin src/vertexShader.glsl' ) ) + ';' +
    'PERLIN.WebGLGenerator.fShaderScript=' +
        '"precision highp float;"+'+
        JSON.stringify( ExecSync.stdout( 'cat vendors/noise2D.glsl' ) ) + '+' +
        JSON.stringify( ExecSync.stdout( 'cat src/fragmentShader.glsl' ) ) + ';' );
