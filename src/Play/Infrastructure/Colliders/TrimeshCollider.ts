import * as CANNON from "cannon-es";
import * as THREE from 'three';
import ConverterHelper from "../Utils/Helper/ConverterHelper";

export interface TrimeshColliderType {
    mass?: number;
	material: CANNON.Material;
	collisionFilterGroup?: number;
}

export class TrimeshCollider
{
	public body: CANNON.Body;

	constructor(mesh: THREE.Mesh, options: TrimeshColliderType)
	{
		let vertices = Array.from(mesh.geometry.attributes.position.array);
		let indices = Array.from(mesh.geometry.index?.array || []);

		let physBody = new CANNON.Body({
			mass: options.mass ?? 0,
			position: ConverterHelper.ThreeToCannonVec(mesh.position),
			quaternion: ConverterHelper.ThreeToCannonQuat(mesh.quaternion),
			shape: new CANNON.Trimesh(vertices, indices),
			material: options.material,
			collisionFilterGroup: options.collisionFilterGroup ?? -1,
		});

		physBody.updateAABB();

		this.body = physBody;
		
	}
	
}