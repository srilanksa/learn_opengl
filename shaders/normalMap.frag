#version 330 core

out vec4 FragColor;

in VS_OUT {
	vec2 TexCoords;
	vec3 TangentLightPos;
	vec3 TangentViewPos;
	vec3 TangentFragPos;
} fs_in;

uniform sampler2D normalMap;
uniform sampler2D diffuseMap;

void main() {
	vec3 color = texture(diffuseMap, fs_in.TexCoords).rgb;
	vec3 normal = texture(normalMap, fs_in.TexCoords).rgb;
	normal = normalize(normal * 2.0 - 1.0);
	vec3 lightColor = vec3(1.0);
	// ambient
	vec3 ambient = 0.15 * lightColor;
	// diffuse
	vec3 lightDir = normalize(fs_in.TangentLightPos - fs_in.TangentFragPos);
	float diff = max(dot(lightDir, normal), 0.0);
	vec3 diffuse = diff * lightColor;
	// specular
	vec3 viewDir = normalize(fs_in.TangentViewPos - fs_in.TangentFragPos);
	float spec = 0.0;
	vec3 halfwayDir = normalize(lightDir + viewDir);  
	spec = pow(max(dot(normal, halfwayDir), 0.0), 64.0);
	vec3 specular = spec * lightColor;    
	// calculate shadow
	vec3 lighting = (ambient + (diffuse + specular)) * color;    

	FragColor = vec4(lighting, 1.0);
}
