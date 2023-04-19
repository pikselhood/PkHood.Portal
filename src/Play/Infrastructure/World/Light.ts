import * as THREE from "three";
import Options from "../../Options";

export default class Light 
{
    public pointLight: THREE.PointLight;
    public ambientLight: THREE.AmbientLight;

    public constructor(scene: THREE.Scene) 
    {
        this.pointLight = new THREE.PointLight(0xffffff, 0);
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1.2);

        if(Options.SHADOW_DEBUG_MOD)
        {
            const helper = new THREE.CameraHelper( this.pointLight.shadow.camera );
            scene.add( helper );
        }

        this.pointLight.position.set(10, 100, 0);
        this.pointLight.castShadow = true;
        scene.add(this.pointLight);
        scene.add(this.ambientLight);
    }

}