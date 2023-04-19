import * as CANNON from "cannon-es";

export interface CapsuleColliderType 
{
    mass: number;
    position: CANNON.Vec3;
	height: number;
	material: CANNON.Material;
	collisionFilterGroup?: number;
}

export class CapsuleCollider
{
	public body: CANNON.Body;

	constructor(options: CapsuleColliderType)
	{
		let physBody = new CANNON.Body({
			mass: options.mass,
			position: options.position,
			angularFactor: new CANNON.Vec3(0, 0, 0),
			material: options.material,
			collisionFilterGroup: options.collisionFilterGroup || -1,
		});

		const r = options.height * 3/11;
		let sphereShape = new CANNON.Sphere(r);
		let cylinderShape = new CANNON.Cylinder(r,r,options.height/2,12);
		let boxShape = new CANNON.Box(new CANNON.Vec3(r,r,r));

		physBody.addShape(sphereShape, new CANNON.Vec3(0, options.height * 1/4, 0));
		// physBody.addShape(boxShape, new CANNON.Vec3(0, options.height * 2/4, 0));
		physBody.addShape(sphereShape, new CANNON.Vec3(0, options.height * 3/4, 0));
		physBody.addShape(cylinderShape, new CANNON.Vec3(0, options.height * 2/4, 0));

		physBody.updateAABB();

		this.body = physBody;
	}
}