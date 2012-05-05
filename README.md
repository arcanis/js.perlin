# JS.Perlin

## Disclaimer

If you want to use this library in a WebGL context, please consider using [this one][1] instead.

[1]: https://github.com/ashima/webgl-noise

## Installation

**Warning :** This is a web-only package : it should not be used in a Node environment.

```npm install wo-perlin```

## Usage

- *new PERLIN.Generator( [ table ] )*

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
var generator = new PERLIN.Generator( );

generator.generate( [ 0, 0 ], [ 2, 2 ], function ( point, value ) {
    console.log( point, value );
} );
```

## Authors

Implementation by Maël Nison, from Jeremy Cochoy's [paper][2].

[2]: http://zenol.fr/dl/perlin_noise.pdf
