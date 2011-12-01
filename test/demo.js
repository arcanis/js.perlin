window.addEventListener( 'load', function ( ) {
	var map    = new Perlin( );
	
	var canvas = document.getElementById( 'canvas' );
	var ctx    = canvas.getContext( '2d' );
	
	var width  = canvas.width;
	var height = canvas.height;
	
	var buffer = ctx.createImageData( width, height );
	
	function update( ) {
		map.generate( [ 0, 0 ], [ width, height ], function ( point, value ) {
			var idx = ( point[ 1 ] * width + point[ 0 ] ) * 4;
			var clr = Math.floor( ( value + 1 ) / 2 * 255 );
			console.log(clr);
			
			buffer.data[ idx + 0 ] = clr;
			buffer.data[ idx + 1 ] = clr;
			buffer.data[ idx + 2 ] = clr;
			buffer.data[ idx + 3 ] = 255;
		});
		
		ctx.putImageData( buffer, 0, 0 );
	}
	
	update( );
} );
