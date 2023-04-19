import * as THREE from "three";
import { ShaderType, SkillShader } from "./SkillShader";

export class SkillObject 
{
    public skillShader?: SkillShader;
    public active: boolean = true;

    constructor() {}

    public _Update(delta: number) 
    {
        throw new Error("Method not implemented.");
    }
}

export class ArcherBasicAttackObject extends SkillObject
{
    public velocity: THREE.Vector3 = new THREE.Vector3(40, 40, 40);
    public target: THREE.Vector3;

    public constructor(origin: THREE.Vector3, target: THREE.Vector3) 
    {
        super();

        this.target = target;
        this.skillShader = new SkillShader(ShaderType.Arrow);
        this.skillShader.object?.position.set(origin.x, origin.y, origin.z);
        this.skillShader.object?.lookAt(target);
    }
    
    public _Update(delta: number) 
    {
        var object = this.skillShader?.object;

        if(object) 
        {
            object.lookAt(this.target);
            var objectDirection = new THREE.Vector3();
            object.getWorldDirection(objectDirection);
            objectDirection.normalize();

            object.position.set(
                object.position.x + this.velocity.x * delta *  objectDirection.x,
                object.position.y + this.velocity.y * delta * objectDirection.y, 
                object.position.z + this.velocity.z * delta * objectDirection.z
                );
            
            if(object.position.distanceTo(this.target) < 0.3) 
            {
                this.active = false;
            }
        }
    }
}

export class MageBasicAttackObject extends SkillObject
{
    public velocity: THREE.Vector3 = new THREE.Vector3(20, 20, 20);
    public target: THREE.Vector3;

    public constructor(origin: THREE.Vector3, target: THREE.Vector3) 
    {
        super();

        this.target = target;
        this.skillShader = new SkillShader(ShaderType.MagicBall);
        this.skillShader.object?.position.set(origin.x, origin.y, origin.z);
        this.skillShader.object?.lookAt(target); 
        // console.log(this.skillShader.object)  
        // this.skillShader.object?.rotation.set(0, Math.PI / 2, 0);
        // this.skillShader.object?.updateMatrixWorld()
        // console.log(this.skillShader.object)  

    }

    public _Update(delta: number) 
    {
        var object = this.skillShader?.object;
        var uniforms = this.skillShader?.uniforms;

        if(object && uniforms) 
        {
            uniforms.iTime.value = performance.now()/1000;

            object.lookAt(this.target);
            var objectDirection = new THREE.Vector3();
            object.getWorldDirection(objectDirection);
            objectDirection.normalize();

            object.position.set(
                object.position.x + this.velocity.x * delta * objectDirection.x,
                object.position.y + this.velocity.y * delta * objectDirection.y, 
                object.position.z + this.velocity.z * delta * objectDirection.z
                );
            
            if(object.position.distanceTo(this.target) < 0.3) {
                this.active = false;
            }

            this.velocity.set(
                this.velocity.x + this.velocity.x * delta,
                this.velocity.y + this.velocity.y * delta,
                this.velocity.z + this.velocity.z * delta
            );
        }
    }
}

export class HealerBasicAttackObject extends SkillObject
{
    public constructor(origin: THREE.Vector3, target: THREE.Vector3) 
    {
        super();

    
    }

}

export class WarriorBasicAttackObject extends SkillObject
{

    public constructor(origin: THREE.Vector3, target: THREE.Vector3) 
    {
        super();

    
    }
}