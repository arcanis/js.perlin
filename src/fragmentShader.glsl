uniform vec2 Window;

void main(void)
{
    vec2 coord = vec2(
        gl_FragCoord.x / Window.x,
        gl_FragCoord.y / Window.y
    );

    float noise = 1.0
        * abs( snoise( coord ) )
        * abs( snoise( coord * 2.0 ) )
        * abs( snoise( coord * 4.0 ) )
        * abs( snoise( coord * 8.0 ) )
    ;

    gl_FragColor = vec4(noise, 0.0, 0.0, 1.0);
}
