var PERLIN = PERLIN || Object.create( null );

PERLIN.Generator = function ( table ) {

    this._table = table || PERLIN.Generator.makeTable( 255 );

    this.octaves = 10;
    this.frequency = .05;
    this.persistence = .5;

};

PERLIN.Generator.random = function ( ) {

    return Math.random( );

};

PERLIN.Generator.makeTable = function ( size ) {

    var result = [ ];

    for ( var n = 0; n < size; ++ n )
	result[ n ] = PERLIN.Generator.random( );

    return result;

};

PERLIN.Generator.cosineInterpolate = function ( a, b, t ) {

    var c = ( 1 - Math.cos( t * Math.PI ) ) * .5;

    return ( 1 - c ) * a + c * b;

};

PERLIN.Generator.prototype = {

    _randify : function ( n ) {

	return this._table[ Math.floor( Math.abs( n ) % this._table.length ) ];

    },

    _noise : function ( point ) {

	var value = 0;

	var dimensions = point.length;
	for (var dimension = 0; dimension < dimensions; ++ dimension )
	    value = this._randify( Math.floor( value * 85000 ) + point[ dimension ] );

	return value;

    },

    _smooth : function ( point, dimension ) {

	if ( dimension < 0 )
	    return this._noise( point );

	var value = point[ dimension ];
	var integer = Math.floor( value );
	var fractional = value - integer;

	point[ dimension ] = integer;
	var a = this._smooth( point, dimension - 1 );

	point[ dimension ] = integer + 1;
	var b = this._smooth( point, dimension - 1 );

	point[ dimension ] = value;

	return PERLIN.Generator.cosineInterpolate( a, b, fractional );

    },

    _perlin : function ( point ) {

	var value = 0;
	var amplitude = 1;

	var octaves = this.octaves;
	var frequency = this.frequency;
	var persistence = this.persistence;

	var copy = point.slice( );
	var dimensions = copy.length;

	for ( var i = 0; i < octaves; ++ i )
	{
	    var t = i * 4096;

	    for ( var dimension = 0; dimension < dimensions; ++ dimension )
		copy[ dimension ] = point[ dimension ] * frequency + t;

	    value += this._smooth( copy, dimensions - 1 ) * amplitude;

	    amplitude *= persistence;
	    frequency *= 2;
	}

	var limiter = ( 1 - persistence ) / ( 1 - amplitude );
	return value * limiter;

    },

    _generate : function ( start, size, callback, dimension ) {

	if ( dimension < 0 )
	    return callback( start, this._perlin( start ) );

	for ( var end = start[ dimension ] + size[ dimension ]; start[ dimension ] < end; ++ start[ dimension ] )
	    this._generate( start, size, callback, dimension - 1 );

	start[ dimension ] -= size[ dimension ];

	return null;

    },

    generate : function ( start, size, callback ) {

	this._generate( start, size, callback, start.length - 1 );

    }

};
