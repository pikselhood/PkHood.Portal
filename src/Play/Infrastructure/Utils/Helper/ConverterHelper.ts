import * as THREE from "three";
import * as CANNON from "cannon-es";

export default class ConverterHelper {

    static CannonToThreeVec(vec: CANNON.Vec3): THREE.Vector3 {
        return new THREE.Vector3(vec.x, vec.y, vec.z);
    }
    
    static ThreeToCannonVec(vec: THREE.Vector3): CANNON.Vec3 {
        return new CANNON.Vec3(vec.x, vec.y, vec.z);
    }
    
    static CannonToThreeQuat(quat: CANNON.Quaternion): THREE.Quaternion {
        return new THREE.Quaternion(quat.x, quat.y, quat.z, quat.w);
    }
    
    static ThreeToCannonQuat(quat: THREE.Quaternion): CANNON.Quaternion {
        return new CANNON.Quaternion(quat.x, quat.y, quat.z, quat.w);
    }

}