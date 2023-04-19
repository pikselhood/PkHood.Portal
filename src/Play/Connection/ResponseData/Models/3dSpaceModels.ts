import { IPosition } from "../../Common/IPosition";
import { IQuaternion } from "../../Common/IQuaternion";

export class Position {
    position?: IPosition;
    
    public copyFromThree(p: THREE.Vector3){
        this.position = {
            x: Math.round(p.x * 1e2) / 1e2,
            y: Math.round(p.y * 1e2) / 1e2,
            z: Math.round(p.z * 1e2) / 1e2
        };
    }
}

export class Quaternion {
    quaternion?: IQuaternion;

    public copyFromThree(q: THREE.Quaternion){
        this.quaternion = {
            x: Math.round(q.x * 1e2) / 1e2,
            y: Math.round(q.y * 1e2) / 1e2,
            z: Math.round(q.z * 1e2) / 1e2,
            w: Math.round(q.w * 1e2) / 1e2
        };
    }
}
