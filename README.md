# JS.Perlin

## Disclaimer

If you want to use this library in a WebGL context, please consider using [this one][1] instead.

[1]: https://github.com/ashima/webgl-noise

## Installation

```npm install js.perlin```

## Usage

- *new Perlin( [ table ] )*

Returns a new generator instance. If `table` is set, then it will be used
as random lookup table otherwise a random table will be generated.

- *[instance].octaves*
- *[instance].frequency*
- *[instance].persistence*

Generator configurations variables.

- *[instance].generate( start, size, callback )*

This function will call `callback()` for each pixel in the N-dimensional
range between `start` and `start+size`, with two parameters : the
coordinates of the current pixel, and the related Perlin value.

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

Implementation by Maël Nison, from Jeremy Cochoy's [paper][2].

[2]: http://zenol.fr/dl/perlin_noise.pdf
