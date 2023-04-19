import * as THREE from "three";
import { MSignal } from "../Infrastructure/Signals/MoveSignal";
import { JSignal } from "../Infrastructure/Signals/JumpSignal";
import { DSignal } from "../Infrastructure/Signals/DigitSignal";
import ClickManager from "./ClickManager";
import WebSocketClient from "../Connection/WebSocketClient";
import { JumpState, MoveState, SkillState } from "../Connection/ResponseData/Models/StateModels";
import StateHelper from "../Infrastructure/Utils/Parser/StateParser";
import { Position, Quaternion } from "../Connection/ResponseData/Models/3dSpaceModels";
import { ICharacterHealth } from "../Connection/ReceivedInput/Types/CharacterStatTypes";
import World from "../Infrastructure/World/World";
import { SelectCharacter } from "../Connection/ResponseData/Models/SelectModels";
import Focus from "./Focus";
import Target from "./Target";
import IUserCharacter from "../Connection/Common/IUserCharacter";
import User from "../Entity/User";
import PlayersManager from "./PlayersManager";
import KeyMap from "./KeyMap";
import Character from "../Entity/Character/Character";

const aimDistance = 5;
export default class UserManager 
{
    public user?: User;
    public keyMap?: KeyMap;
    
    private world: World;
    private socket: WebSocketClient;
    private target: Target;
    private focus: Focus = new Focus();
    private aim: THREE.Vector3 = new THREE.Vector3();
    private clickManager: ClickManager;

    private rotateCharacterAndCamera: boolean = false;
    private rotateOnlyCamera: boolean = false;
    private quaternionInterval?: number;
    private positionInterval?: number;
    private idlePositionInterval?: number;

    constructor(world: World, socket: WebSocketClient, playersManager: PlayersManager) 
    {
        this.world = world;
        this.socket = socket;

        this.clickManager = new ClickManager(this.world);
        this.target = new Target(this, playersManager);

        this.idlePositionInterval = this.socketIdlePositionInterval();
    }

    public _Update(delta: number) 
    {
        if(this.user)
        {
            this._SocketUpdate();
            this._UpdateAim();
            this.world.camera._Update(delta, this.user, this.aim);
            this._Rotation();
        }
    }

    public setUser(type: IUserCharacter, character: Character) 
    {
        this.user = new User(type, character);
        this.keyMap = new KeyMap(type.class);
        this.world.hud.set({
            name: type.name, 
            health: type.health, 
            maxHealth: type.stats.maxHealth, 
            mana: type.mana, 
            maxMana: type.stats.maxMana});
    }

    public updateHud = (data: ICharacterHealth) => 
    {
        if(data.characterId === this.user?.character.id)
        {
            this.world.hud.set({
                health: data.health});
        }
    }

    public setMove(moveSignal: MSignal)
    {
        this.user?.character.signals.moveSignal.set(moveSignal);
    }

    public unSetMove(moveSignal: MSignal)
    {
        this.user?.character.signals.moveSignal.unSet(moveSignal);
    }

    public setJump(jumpSignal: JSignal)
    {
        this.user?.character.signals.jumpSignal.set(jumpSignal);
    }

    public unSetJump(jumpSignal: JSignal)
    {
        this.user?.character.signals.jumpSignal.unSet(jumpSignal);
    }

    public setDigit(digitSignal: DSignal)
    {
        this.user?.character.signals.digitSignal.set(digitSignal);
    }

    public unSetDigit(digitSignal: DSignal)
    {
        this.user?.character.signals.digitSignal.unSet(digitSignal);
    }

    public setRotateOnlyCamera(value: boolean)
    {
        this.rotateOnlyCamera = value;
    }

    public setRotateCharacterAndCamera(value: boolean)
    {
        this.rotateCharacterAndCamera = value;

        if(value)
        {
            this.quaternionInterval = this.socketQuaternionInterval();
        }
        else
        {
            window.clearInterval(this.quaternionInterval);
            this.socketQuaternionWriteFunction();
        }        
    }

    private _Rotation() 
    {
        if (this.rotateCharacterAndCamera)
        {
            this.user?.character.characterObject.object.lookAt(this.aim.x, this.aim.y, this.aim.z);
        }
    }

    private _SocketUpdate() 
    {
        var userMoveSignal = this.user?.character.signals.moveSignal;
        var userJumpSignal = this.user?.character.signals.jumpSignal;
        var userDigitSignal = this.user?.character.signals.digitSignal;

        if (userMoveSignal?.isChange()) 
        {
            const m = new MoveState();
            m.moveState = StateHelper.ParseMoveState(userMoveSignal);
            this.socket.WriteData(m);
        }

        if (userJumpSignal?.isChange()) 
        {
            const j = new JumpState();
            j.jumpState = StateHelper.ParseJumpState(userJumpSignal);
            this.socket.WriteData(j);
        }

        if (userDigitSignal?.isChange())
        {
            const digit = userDigitSignal?.changedDigit();
            if (digit != null)
            {
                const skillId = this.keyMap?.digitsToSkillIdMap[digit]
                if (skillId)
                {
                    if(this.user?.tryCastSkill(skillId, this.target?.character))
                    {
                        const skill = new SkillState();
                        skill.skillState = skillId;
                        this.socket.WriteData(skill);
                    }
                }
            }
            
        }

        if(userMoveSignal?.anyMove() && this.idlePositionInterval)
        {
            window.clearInterval(this.idlePositionInterval);
            this.idlePositionInterval = undefined;
            this.positionInterval = this.socketPositionInterval();
        }
        else if(!userMoveSignal?.anyMove() && this.positionInterval)
        {
            window.clearInterval(this.positionInterval);
            this.positionInterval = undefined;
            this.idlePositionInterval = this.socketIdlePositionInterval();
        }  

    }

    private _UpdateAim() 
    {
        if(this.user)
        {
            const aimDirection = new THREE.Vector3();

            const userPosition = this.user.character.characterObject.object.position;
    
            if (this.world.camera.hasTarget()) 
            {
                var cameraPosition = this.world.camera.perspectiveCamera.position;
                aimDirection.subVectors(userPosition, cameraPosition);
            }
            else 
            {
                this.user.character.characterObject.object.getWorldDirection(aimDirection);
            }
    
            aimDirection.normalize();
    
            const rotationFactor = Math.sqrt(
                aimDistance ** 2 / (aimDirection.x ** 2 + aimDirection.z ** 2)
            );
    
            this.aim.x = userPosition.x + aimDirection.x * rotationFactor;
            this.aim.y = userPosition.y;
            this.aim.z = userPosition.z + aimDirection.z * rotationFactor;
        }
        
    }

    public updateFocus(event: any) 
    {
        const newTarget = this.clickManager.GetTarget(event);
        this.focus.ChangeFocus(newTarget);
    }

    public updateTarget(event: any) 
    {
        const newTarget = this.clickManager.GetTarget(event);
        if (this.target.TryChangeTarget(newTarget)){
            this.socket.WriteData(new SelectCharacter(this.target.character?.characterObject.object.uuid));
        }
        
    }

    private socketQuaternionInterval() 
    {
        return window.setInterval(this.socketQuaternionWriteFunction, 50);
    }

    private socketQuaternionWriteFunction = () => 
    {
        if(this.user)
        {
            const q = new Quaternion();
            q.copyFromThree(this.user.character.characterObject.object.quaternion);
            this.socket.WriteData(q);
        }
    }

    private socketPositionInterval() 
    {
        return window.setInterval(this.socketPositionWriteFunction, 500);
    }

    private socketIdlePositionInterval() 
    {
        return window.setInterval(this.socketPositionWriteFunction, 5000);
    }

    private socketPositionWriteFunction = () => 
    {
        if(this.user)
        {
            const p = new Position();
            p.copyFromThree(this.user.character.characterObject.object.position);
            this.socket.WriteData(p);
        }
    }
}
