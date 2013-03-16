uniform vec2 Window;

void main(void)
{
    vec2 coord = vec2(
        gl_FragCoord.x / Window.x,
        gl_FragCoord.y / Window.y
    );

    float noise = ( snoise( coord ) + 1.0 ) / 2.0;

    gl_FragColor = vec4(noise, 0.0, 0.0, 1.0);
}
