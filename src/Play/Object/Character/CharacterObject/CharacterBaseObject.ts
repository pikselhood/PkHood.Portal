import * as THREE from "three";
import * as CANNON from "cannon-es";
import LoaderHelper from "../../../Infrastructure/Utils/Helper/LoaderHelper";
import CharacterAnimation, { CharacterAnimationType } from "../CharacterAnimation";
import Header from "../Header";
import ClickableBox from "../ClickableBox";
import Options from "../../../Options";
import { IPosition } from "../../../Connection/Common/IPosition";
import { IQuaternion } from "../../../Connection/Common/IQuaternion";
import World from "../../../Infrastructure/World/World";
import Signals from "../../../Infrastructure/Signals/Signals";
import DamageSprite from "../DamageSprite";

export interface CharacterBaseObjectType 
{
    name: string;
    position: IPosition;
    quaternion: IQuaternion;
    maxHealth: number;
    health: number;
    maxMana: number;
    mana: number;
    modelUrl: string;
    characterAnimation: CharacterAnimationType
}

export default class CharacterBaseObject 
{
    public object: THREE.Group = new THREE.Group();
    public get handPosition() {return new THREE.Vector3(this.object.position.x, this.object.position.y + 0.9, this.object.position.z);}

    public characterAnimation?: CharacterAnimation;

    public model?: THREE.Group;
    public header: Header;
    public damageSprite: DamageSprite;
    public clickableBox: ClickableBox;
    public selectedObject: THREE.Mesh;
    
    public velocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    public onGroundDebug: THREE.Mesh;

    constructor(type: CharacterBaseObjectType) 
    {
        LoaderHelper.loadFBX(type.modelUrl, (model) => 
        {
            this.model = model;

            model.children.forEach((x: any) => 
            {
                if (x instanceof THREE.SkinnedMesh) 
                {
                    const oldMat = x.material
                    x.material = new THREE.MeshStandardMaterial(
                        {
                            map: oldMat.map,
                            metalness: 0, 
                            roughness: 1
                        });
                }
            });

            model.scale.set(0.0026, 0.0026, 0.0026);
            model.name = 'CharacterModel';
            
            model.traverse((child: any) => 
            {
                if (child.isMesh) 
                {
                    child.castShadow = true;
                    child.receiveShadow = false;

                    // const oldMat = child.material
                    // child.material = new THREE.MeshLambertMaterial({
                    //     ...oldMat
                    // });
                } else 
                {
                    child.layers.disableAll();
                }
            });
            
            this.object.add(model);

            this.characterAnimation = new CharacterAnimation(model, type.characterAnimation);

        });

        this.header = new Header(type.name, type.health, type.maxHealth, 1);
        this.header.object.position.set(0, 2.4, 0);
        this.object.add(this.header.object);

        this.damageSprite = new DamageSprite();
        this.damageSprite.object.position.set(0, 2, 0);
        this.object.add(this.damageSprite.object);

        this.clickableBox = new ClickableBox();
        this.clickableBox.object.position.set(0, 1, 0);
        this.object.add(this.clickableBox.object);

        const box = new THREE.BoxGeometry(0.1, 0.1, 0.1, 1, 1, 1);
        this.selectedObject = new THREE.Mesh(box);
        this.selectedObject.position.set(0, 2.5, 0);
        this.selectedObject.visible = false;
        this.object.add(this.selectedObject);

        this.object.quaternion.set(
            type.quaternion.x,
            type.quaternion.y,
            type.quaternion.z,
            type.quaternion.w
        );

        this.object.position.set(
            type.position.x,
            type.position.y,
            type.position.z
        );

        this.object.name = 'CharacterObject';

        this.onGroundDebug = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.1, 0.1)
        );
        this.onGroundDebug.position.set(0,-0.2,0);

        if (Options.CANON_DEBUG_MOD) this.object.add(this.onGroundDebug);
    }

    public _Update(delta: number, body: CANNON.Body, signals: Signals) 
    {
        this._Move(body);
        this._Animate(delta, signals);
    }

    public delete(world: World) 
    {
        if(this.model)
        {
            this.object.remove(this.model);
        }
        this.object.remove(this.header.object);
        this.object.remove(this.clickableBox.object);
        world.scene.remove(this.object);
    }

    private _Move(body: CANNON.Body) 
    {
        this.object.position.set(
            body.position.x,
            body.position.y,
            body.position.z
        );
    }

    public _Animate(delta: number, signals: Signals)
    {
        this.characterAnimation?._Animate(delta, signals);
    }

    public select()
    {
        this.selectedObject.visible = true;
    }

    public deselect()
    {
        this.selectedObject.visible = false;
    }

}