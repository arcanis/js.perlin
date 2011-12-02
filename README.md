# JS.Perlin

## Installation

```npm install js.perlin```

## Usage

*<Perlin>.generate( start, size, callback )*

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

- Understanding why implements Perlin.random as `Math.random( ) * 2 - 1`
  just doesn't work.

- Implementing _real_ Perlin noises (standard & simplex).

## Authors

Implementation by Maël Nison, from Jeremy Cochoy's [paper][1].

[1]: http://zenol.fr/dl/perlin_noise.pdf
