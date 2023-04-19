import * as THREE from "three";

export enum ShaderType {
    Arrow,
    MagicBall
}

export class SkillShader 
{
    public object = new THREE.Group();
    public uniforms?: any;

    constructor(effectType: ShaderType)
    {
        switch(effectType){
            case ShaderType.Arrow:
                this.initArrowShader();
                break;
            case ShaderType.MagicBall:
                this.initMagicBallShader();
                break;
        }
    }
    
    private initArrowShader()
    {
        this.uniforms =
        {
            pointTexture: { value: new THREE.TextureLoader().load( './sprites/spark1.png' ) }
        };

        const shaderMaterial = new THREE.ShaderMaterial( 
            {
                uniforms: this.uniforms,

                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true,
                vertexColors: true
            });

        var geometry = new THREE.SphereGeometry(0.5, 10, 5);

        var mesh = new THREE.Mesh( geometry, shaderMaterial );
        this.object.add(mesh);
    }

    private initMagicBallShader()
    {
    
        const fragmentShader = `
            // based on https://www.shadertoy.com/view/lsf3RH by
            // trisomie21 (THANKS!)
            // My apologies for the ugly code.

            #include <common>

            uniform vec3 iResolution;
            uniform float iTime;
            uniform sampler2D iChannel0;
            
            
            float snoise(vec3 uv, float res)
            {
                const vec3 s = vec3(1e0, 1e2, 1e3);
                
                uv *= res;
                
                vec3 uv0 = floor(mod(uv, res))*s;
                vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;
                
                vec3 f = fract(uv); f = f*f*(3.0-2.0*f);

                vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,
                            uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);

                vec4 r = fract(sin(v*1e-1)*1e3);
                float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
                
                r = fract(sin((v + uv1.z - uv0.z)*1e-1)*1e3);
                float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
                
                return mix(r0, r1, f.z)*2.-1.;
            }

            void mainImage( out vec4 fragColor, in vec2 fragCoord ) 
            {
                vec2 p = -.5 + fragCoord.xy / iResolution.xy;
                p.x *= iResolution.x/iResolution.y;
                
                float color = 3.0 - (3.*length(2.*p));
                
                vec3 coord = vec3(atan(p.x,p.y)/6.2832+.5, length(p)*.4, .5);
                
                for(int i = 1; i <= 7; i++)
                {
                    float power = pow(2.0, float(i));
                    color += (1.5 / power) * snoise(coord + vec3(0.,-iTime*.05, iTime*.01), power*16.);
                }
                fragColor = vec4( color, pow(max(color,0.),2.)*0.4, pow(max(color,0.),3.)*0.15 , 1.0);
            }
            
            varying vec2 vUv;

            void main() {
                mainImage(gl_FragColor, vUv * iResolution.xy);
            }
        
            `;

        const vertexShader = `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
          `;

        const texture = new THREE.TextureLoader().load( './sprites/noise.png' )
        //   texture.minFilter = THREE.NearestFilter;
        //   texture.magFilter = THREE.NearestFilter;
        //   texture.wrapS = THREE.RepeatWrapping;
        //   texture.wrapT = THREE.RepeatWrapping;

        this.uniforms = {
            iTime: { value: 0 },
            iResolution:  { value: new THREE.Vector3(1,1,1) },
            //iChannel0: { value: texture }
            };

        const shaderMaterial = new THREE.ShaderMaterial( 
            {
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: this.uniforms,
                
                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true,
                vertexColors: true
            });

        //var geometry = new THREE.CapsuleGeometry(0.5, 0.5, 0.5, 20, 20);
        
        var geometry = new THREE.SphereGeometry(0.5, 10, 5);
		//var geometry = new THREE.BufferGeometry();

        var mesh = new THREE.Mesh( geometry, shaderMaterial )
        mesh.rotateY(-Math.PI/2);
        this.object.add(mesh);
    }

}