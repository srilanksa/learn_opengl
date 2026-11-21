#version 330
in vec2 TexCoords;

out vec4 FragColor;

uniform sampler2D texture_buffer;

void main() {
	FragColor = texture(texture_buffer, TexCoords);
}
