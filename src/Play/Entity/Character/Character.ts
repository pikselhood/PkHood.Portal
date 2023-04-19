import * as THREE from "three";
import { IPosition } from "../../Connection/Common/IPosition";
import { IQuaternion } from "../../Connection/Common/IQuaternion";
import World from "../../Infrastructure/World/World";
import Signals from "../../Infrastructure/Signals/Signals";
import CharacterBaseObject from "../../Object/Character/CharacterObject/CharacterBaseObject";
import * as CharacterClassObject from "../../Object/Character/CharacterObject/CharacterClassObject";
import CharacterPhysics from "../../Physics/Character/CharacterPhysics";
import Skill from "../Skill";
import Status from "./Status";

export interface CharacterType 
{
    id: string;
    name: string;
    class: string; // "warrior" | "mage" | "archer" | "healer";
    position: IPosition;
    quaternion: IQuaternion;
    maxHealth: number;
    health: number;
    maxMana: number;
    mana: number;
}

export default class Character 
{
    public world: World;
    public id: string;
    public characterObject: CharacterBaseObject;
    public characterPhysics: CharacterPhysics;
    public maxHealth: number;
    public health: number;
    public maxMana: number;
    public mana: number;

    public status: Status;
    public signals: Signals = new Signals();

    public level: number = 1;
    public totalExp: number = 0;

    constructor(type: CharacterType, world: World) 
    {
        this.id = type.id;
        this.world = world;
        this.maxHealth = type.maxHealth;
        this.health = type.health;
        this.maxMana = type.maxMana;
        this.mana = type.mana;

        switch(type.class)
        {
            case "warrior":
                this.characterObject = new CharacterClassObject.WarriorObject(type);
                break;
            case "mage":
                this.characterObject = new CharacterClassObject.MageObject(type);
                break;
            case "archer":
                this.characterObject = new CharacterClassObject.ArcherObject(type);
                break;
            case "healer":
                this.characterObject = new CharacterClassObject.HealerObject(type);
                break;
            default: 
                this.characterObject = new CharacterClassObject.WarriorObject(type);
                break;
        }

        this.characterPhysics = new CharacterPhysics(
            {
                position: type.position,
                material: this.world.materials.characterMaterial
            });

        this.characterObject.object.uuid = type.id;

        this.status = new Status(this.characterObject, this.world);

        this.world.scene.add(this.characterObject.object);
        this.world.physics.addBody(this.characterPhysics.body);

    }

    public _Update(delta: number) 
    {
        this.characterObject._Update(delta, this.characterPhysics.body, this.signals);
        this.characterPhysics._Update(this.world, delta, this.signals, this.getDirection());
        this.status._Update(this.signals);
        this.signals._UpdateChange();
    }

    public delete(): void 
    {
        this.characterObject.delete(this.world);
        this.characterPhysics.delete(this.world);
    }

    private getDirection() 
    {
        var direction = new THREE.Vector3();
        this.characterObject.object.getWorldDirection(direction);
        direction.normalize();
        return direction
    }


    public castSkill(skillId: number, target?: Character, castedCallback?: () => void)  
    {
        if(target) 
        {
            const canceledCallBack = () => 
            {
                this.characterObject.characterAnimation?.cancel(skill?.animationType);
            };

            const skill = Skill.AllSkills.find(skill => skill.id === skillId);
            this.status.castSkill(skill, target, castedCallback, canceledCallBack);
            this.characterObject.characterAnimation?.animate(skill?.animationType);
        }
    }

    public changeCurrentHealth(newCurrentHealth: number)
    {
        const change = this.health - newCurrentHealth;
        const percentage = (100 * change) / this.maxHealth;
        if(change < -10 || change > 10)
        {
            this.characterObject.damageSprite.newDamageSprite(change, percentage);
        }
        this.health = newCurrentHealth;
        this.updateHpBar();
    }

    public changeMaxHealth(newMaxHealth: number)
    {
        this.maxHealth = newMaxHealth;
        this.updateHpBar();
    }

    private updateHpBar()
    {
        var percent = 100 * this.health / this.maxHealth;
        if(percent < 0)
        {
            percent = 0;
        }
        this.characterObject.header.hpBar.update(percent);
    }

}
