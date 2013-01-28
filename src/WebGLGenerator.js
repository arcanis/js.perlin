var PERLIN = PERLIN || Object.create( null );

PERLIN.WebGLGenerator = function ( width, height ) {

    this.width = width;
    this.height = height;

    this.gl = PERLIN.WebGLGenerator.createContext( width, height );

    this.data = new Float32Array( width * height );

};

PERLIN.WebGLGenerator.createContext = function ( width, height ) {

    var w_2 = width / 2, h_2 = height / 2;

    var cvs = document.createElement( 'canvas' );
    var gl = cvs.getContext( 'experimental-webgl', {
        preserveDrawingBuffer : true
    } );

    cvs.width = width, cvs.height = height;

    var shaderProgram = gl.createProgram( );
    gl.attachShader( shaderProgram, PERLIN.WebGLGenerator.createShader( gl, gl.VERTEX_SHADER, PERLIN.WebGLGenerator.vShaderScript ) );
    gl.attachShader( shaderProgram, PERLIN.WebGLGenerator.createShader( gl, gl.FRAGMENT_SHADER, PERLIN.WebGLGenerator.fShaderScript ) );
    gl.linkProgram( shaderProgram );
    gl.useProgram( shaderProgram );

    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.enable( gl.DEPTH_TEST );

    gl.viewport( 0, 0, width, height );
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    var windowUniform = gl.getUniformLocation( shaderProgram, 'Window' );
    gl.uniform2f( windowUniform, width, height );

    var squareVertices = [ ].concat( [ - w_2, - h_2, 0 ], [ w_2, - h_2, 0 ], [ - w_2, h_2, 0 ], [ w_2, h_2, 0 ] );
    var squareVertexPositionBuffer = gl.createBuffer( );
    gl.bindBuffer( gl.ARRAY_BUFFER, squareVertexPositionBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( squareVertices ), gl.STATIC_DRAW );

    var vertexPositionAttribute = gl.getAttribLocation( shaderProgram, 'VertexPosition' );
    gl.enableVertexAttribArray( vertexPositionAttribute );
    gl.vertexAttribPointer( vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0 );

    return gl;

};

PERLIN.WebGLGenerator.createShader = function ( gl, type, script ) {

    var shader = gl.createShader( type );

    gl.shaderSource( shader, script );
    gl.compileShader( shader );

    if ( ! gl.getShaderParameter( shader, gl.COMPILE_STATUS ) )
        throw new Error( gl.getShaderInfoLog( shader ) );

    return shader;

};

PERLIN.WebGLGenerator.prototype.generate = function ( ) {

    this.gl.drawArrays( this.gl.TRIANGLE_STRIP, 0, 4 );

    var pixelData = new Uint8Array( this.width * this.height * 4 );
    this.gl.readPixels( 0, 0, this.width, this.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixelData );

    for ( var pixelIndex = 0, perlinIndex = 0; pixelIndex < pixelData.length; pixelIndex += 4, perlinIndex += 1 )
        this.data[ perlinIndex ] = pixelData[ pixelIndex ] / 255;

    return this;

};

PERLIN.WebGLGenerator.prototype.get = function ( x, y ) {

    return this.data[ y * this.width + x ];

};
