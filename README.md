# JS.Perlin

## Installation

```npm install js.perlin```

## Usage

```javascript
var Perlin = require( 'js.perlin' ).Perlin;

var map = new Perlin( );
map.generate( [ 0, 0 ], [ 2, 2 ], function ( point, value ) {
    console.log( point, value );
} );
```

## Authors

Implementation by Maël Nison, from Jeremy Cochoy's [paper][1].

## External references

[1]: http://zenol.fr/dl/perlin_noise.pdf
