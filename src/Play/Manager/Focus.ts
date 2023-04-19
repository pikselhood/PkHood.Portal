import * as THREE from "three";

export default class Focus {

    public ChangeFocus(newObject: THREE.Object3D | null | undefined) {
        
        if (newObject) {
            document.body.style.cursor = 'pointer';
        }
        else{
            document.body.style.cursor = 'default';
        }
        
    }

}