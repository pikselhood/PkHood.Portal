import * as CANNON from "cannon-es";
import ConverterHelper from "../Utils/Helper/ConverterHelper";

export interface BoxColliderType {
    mass?: number;
	material: CANNON.Material;
	collisionFilterGroup?: number;
}

export class BoxCollider
{
	public body: CANNON.Body;
	
	constructor(mesh: THREE.Mesh, options: BoxColliderType)
	{
		let physBody = new CANNON.Body({
			mass: options.mass ?? 0,
			position: ConverterHelper.ThreeToCannonVec(mesh.position),
			quaternion: ConverterHelper.ThreeToCannonQuat(mesh.quaternion),
			shape : new CANNON.Box(new CANNON.Vec3(mesh.scale.x, mesh.scale.y, mesh.scale.z)),
			material: options.material,
			collisionFilterGroup: options.collisionFilterGroup ?? -1,
		});

		physBody.updateAABB();

		this.body = physBody;
	}
}