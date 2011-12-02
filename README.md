# JS.Perlin

## Installation

```npm install js.perlin```

## Usage

*new Perlin( [ table ] )*

Returns a new generator instance. If table is set, then it will be used
as random lookup table otherwise a random table will be generated.

*<Perlin instance>.octaves*
*<Perlin instance>.frequency*
*<Perlin instance>.persistence*

Generator configurations variables.

*<Perlin instance>.generate( start, size, callback )*

This function will call callback() for each pixel in the N-dimensional
range between start and start+size, with two parameters :

 - The coordinates of the current pixel
 - The Perlin value of the pixel

```javascript
var Perlin = require( 'js.perlin' ).Perlin;

var map = new Perlin( );

map.generate( [ 0, 0 ], [ 2, 2 ], function ( point, value ) {
    console.log( point, value );
} );
```

## To do

I need to :

- Understand why implements Perlin.random as `Math.random( ) * 2 - 1`
  just doesn't work.

- Implement _real_ Perlin noises (standard & simplex).

If you can help me on one of these two issues, please feel free to post an issue
and / or make pull requests !

## Authors

Implementation by Maël Nison, from Jeremy Cochoy's [paper][1].

[1]: http://zenol.fr/dl/perlin_noise.pdf
