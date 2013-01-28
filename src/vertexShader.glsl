attribute vec3 VertexPosition;

void main( void )
{
    gl_Position = vec4( VertexPosition, 1.0 );
}
