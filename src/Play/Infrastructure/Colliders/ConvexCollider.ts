import * as CANNON from "cannon-es";
import * as THREE from 'three';

export class ConvexCollider
{
	// public mesh: any;
	// public options: any;
	// public body: CANNON.Body;
	// public debugModel: any;

	// constructor(mesh: THREE.Object3D, options: any)
	// {
	// 	this.mesh = mesh.clone();

	// 	let defaults = {
	// 		mass: 0,
	// 		position: mesh.position,
	// 		friction: 0.3
	// 	};

	// 	let mat = new CANNON.Material('convMat');
	// 	mat.friction = options.friction;

	// 	// if (this.mesh.geometry.isBufferGeometry)
	// 	// {
	// 	// 	this.mesh.geometry = new THREE.Geometry().fromBufferGeometry(this.mesh.geometry);
	// 	// }

	// 	let cannonPoints = this.mesh.geometry.vertices.map((v: THREE.Vector3) => {
	// 		return new CANNON.Vec3( v.x, v.y, v.z );
	// 	});
		
	// 	let cannonFaces = this.mesh.geometry.faces.map((f: any) => {
	// 		return [f.a, f.b, f.c];
	// 	});

	// 	let shape = new CANNON.ConvexPolyhedron(cannonPoints, cannonFaces);

	// 	// Add phys sphere
	// 	let physBox = new CANNON.Body({
	// 		mass: options.mass,
	// 		position: options.position,
	// 		shape
	// 	});

	// 	physBox.material = mat;

	// 	this.body = physBox;
	// }
}