#version 330 core
out vec4 FragColor;

in vec2 TexCoords;

uniform float exposure;
uniform sampler2D hdrBuffer;
uniform sampler2D bloomBlur;

void main()
{
	const float gamma = 2.2;
	vec3 hdrColor = texture(hdrBuffer, TexCoords).rgb;
	vec3 bloomColor = texture(bloomBlur, TexCoords).rgb;
	hdrColor += bloomColor;
	// reinhard tone mapping
	//vec3 mapped = hdrColor / (hdrColor + vec3(1.0));
	// exposure tone mapping
	vec3 mapped = vec3(1.0) - exp(-hdrColor * exposure);
	// gamma correction
	mapped = pow(mapped, vec3(1.0 / gamma));

	FragColor = vec4(mapped, 1.0);
}

