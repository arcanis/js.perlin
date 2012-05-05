var fs = require( 'fs' );

var parser = require( 'uglify-js' ).parser;
var uglify = require( 'uglify-js' ).uglify;

var getSourceCode = function ( list ) {

	return list.map( function ( path ) {

		return fs.readFileSync( path, 'utf8' );

	} ).join( '\n' );

};

var uglifySourceCode = function ( sourceCode ) {

	var ast = parser.parse( sourceCode );

	ast = uglify.ast_mangle( ast );
	ast = uglify.ast_squeeze( ast );

	return uglify.gen_code( ast );

};

var sourceCode = getSourceCode( [

	'src/namespace.js',

	'src/Core/Generator.js'

] );

fs.writeFile( 'build/Perlin.js',
	uglifySourceCode(
		sourceCode
	)
);
