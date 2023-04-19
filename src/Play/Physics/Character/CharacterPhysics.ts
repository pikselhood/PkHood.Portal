import * as THREE from "three";
import * as CANNON from "cannon-es";
import { IPosition } from "../../Connection/Common/IPosition";
import World from "../../Infrastructure/World/World";
import Signals from "../../Infrastructure/Signals/Signals";
import { CapsuleCollider } from "../../Infrastructure/Colliders/CapsuleCollider";

const moveScale = 50;
const moveResist = 10;
const jumpScale = 80;

export interface CharacterPhysicsType 
{
    position: IPosition;
    material: CANNON.Material;
}

export default class CharacterPhysics 
{
    public body: CANNON.Body;

    public velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    public constructor(type: CharacterPhysicsType) 
    {
        this.body = new CapsuleCollider({
            mass: 85,
            position: new CANNON.Vec3(type.position.x, type.position.y, type.position.z),
            height: 1.8,
            material: type.material,
        }).body;
    }

    public _Update(world: World, delta: number, signals: Signals, direction: THREE.Vector3)
    {
        this._Move(world, delta, signals, direction);
    }

    public delete(world: World) 
    {
        world.physics.removeBody(this.body);
    }

    private _Move(world: World, delta: number, signals: Signals, direction: THREE.Vector3) 
    {
        this.body.velocity.set(
            this.velocity.x,
            Math.min(this.body.velocity.y, 4),
            this.velocity.z
        );

        this.calculateVelocity(delta, signals, direction);
        this.calculateOnGround(world, signals);
    }
    

    private calculateVelocity(delta: number, signals: Signals, direction: THREE.Vector3) 
    {
        if (signals.onGround) 
        {
            this.velocity.x -= this.velocity.x * moveResist * delta;
            this.velocity.z -= this.velocity.z * moveResist * delta;
            if (signals.moveSignal.any()) 
            {
    
                if (signals.moveSignal.forward) 
                {
                    this.velocity.z += direction.z * moveScale * delta;
                    this.velocity.x += direction.x * moveScale * delta;
                }
                if (signals.moveSignal.right) 
                {
                    this.velocity.z += direction.x * moveScale * delta;
                    this.velocity.x -= direction.z * moveScale * delta;
                }
                if (signals.moveSignal.backward) 
                {
                    this.velocity.z -= direction.z * moveScale * delta;
                    this.velocity.x -= direction.x * moveScale * delta;
                }
                if (signals.moveSignal.left) 
                {
                    this.velocity.z -= direction.x * moveScale * delta;
                    this.velocity.x += direction.z * moveScale * delta;
                }
            }
        }
        
        if (signals.jumpSignal.any()) 
        {
            if (signals.jumpSignal.jump && signals.onGround) 
            {
                this.body.applyImpulse(new CANNON.Vec3(0, jumpScale, 0));
                signals.onGround = false;
            }
        }
    }

    private calculateOnGround(world: World, signals: Signals) 
    {
        const raySafeOffset: number = 0.2;
        var rayResult: CANNON.RaycastResult | undefined;

        const start = new CANNON.Vec3(
            this.body.position.x,
            this.body.position.y,
            this.body.position.z
        );
        const end = new CANNON.Vec3(
            this.body.position.x,
            this.body.position.y - raySafeOffset,
            this.body.position.z
        );
        const rayCastOptions = {
            collisionFilterMask: 1,
            skipBackfaces: true,
        };

        signals.onGround = world.physics.raycastClosest(
            start,
            end,
            rayCastOptions,
            rayResult
        );
    }
}
