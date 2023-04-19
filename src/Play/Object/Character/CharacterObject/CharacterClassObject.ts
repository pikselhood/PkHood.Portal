import { IPosition } from "../../../Connection/Common/IPosition";
import { IQuaternion } from "../../../Connection/Common/IQuaternion";
import { AnimationType } from "../../../Infrastructure/Animation/AnimationType";
import CharacterBaseObject from "./CharacterBaseObject";

export interface CharacterClassObjectType 
{
    name: string;
    position: IPosition;
    quaternion: IQuaternion;
    maxHealth: number;
    health: number;
    maxMana: number;
    mana: number;
}
export class WarriorObject extends CharacterBaseObject {

    constructor(type: CharacterClassObjectType) {
        super(
            {
                ...type,
                modelUrl: "./Models/WarriorAnimations/WarriorTPose.fbx",
                characterAnimation: {
                    idleActionUrl: "./Models/WarriorAnimations/Idle.fbx",
                    jumpActionUrl: "./Models/WarriorAnimations/Jumping.fbx",
                    walkActionUrl: "./Models/WarriorAnimations/Running.fbx",
                    backwardActionUrl: "./Models/WarriorAnimations/Running_Backward.fbx",
                    sideWalkLActionUrl: "./Models/WarriorAnimations/Left_Strafe.fbx",
                    sideWalkRActionUrl: "./Models/WarriorAnimations/Right_Strafe.fbx",
                    skillActions: [
                        {
                            type: AnimationType.WarriorBasicAttack, 
                            url: "./Models/WarriorAnimations/WarriorAttack.fbx"
                        }
                    ]
                }
            });

    }

}
export class ArcherObject extends CharacterBaseObject 
{
    constructor(type: CharacterClassObjectType) {
        super(
            {
                ...type,
                modelUrl: "./Models/ArcherAnimations/ArcherTPose.fbx",
                characterAnimation: {
                    idleActionUrl: "./Models/ArcherAnimations/Idle.fbx",
                    jumpActionUrl: "./Models/ArcherAnimations/Jumping.fbx",
                    walkActionUrl: "./Models/ArcherAnimations/Running.fbx",
                    backwardActionUrl: "./Models/ArcherAnimations/Running_Backward.fbx",
                    sideWalkLActionUrl: "./Models/ArcherAnimations/Left_Strafe.fbx",
                    sideWalkRActionUrl: "./Models/ArcherAnimations/Right_Strafe.fbx",
                    skillActions: [
                        {
                            type: AnimationType.ArcherBasicAttack, 
                            url: "./Models/ArcherAnimations/ArcherAttack.fbx"
                        }
                    ]
                }
            });

    }
}
export class MageObject extends CharacterBaseObject 
{
    constructor(type: CharacterClassObjectType) {
        super(
            {
                ...type,
                modelUrl: "./Models/MageAnimations/MageTPose.fbx",
                characterAnimation: {
                    idleActionUrl: "./Models/MageAnimations/Idle.fbx",
                    jumpActionUrl: "./Models/MageAnimations/Jumping.fbx",
                    walkActionUrl: "./Models/MageAnimations/Running.fbx",
                    backwardActionUrl: "./Models/MageAnimations/Running_Backward.fbx",
                    sideWalkLActionUrl: "./Models/MageAnimations/Left_Strafe.fbx",
                    sideWalkRActionUrl: "./Models/MageAnimations/Right_Strafe.fbx",
                    skillActions: [
                        {
                            type: AnimationType.MageBasicAttack, 
                            url: "./Models/MageAnimations/MageAttack.fbx"
                        }
                    ]
                }
            });

    }
}
export class HealerObject extends CharacterBaseObject 
{
    constructor(type: CharacterClassObjectType) {
        super(
            {
                ...type,
                modelUrl: "./Models/HealerAnimations/HealerTPose.fbx",
                characterAnimation: {
                    idleActionUrl: "./Models/HealerAnimations/Idle.fbx",
                    jumpActionUrl: "./Models/HealerAnimations/Jumping.fbx",
                    walkActionUrl: "./Models/HealerAnimations/Running.fbx",
                    backwardActionUrl: "./Models/HealerAnimations/Running_Backward.fbx",
                    sideWalkLActionUrl: "./Models/HealerAnimations/Left_Strafe.fbx",
                    sideWalkRActionUrl: "./Models/HealerAnimations/Right_Strafe.fbx",
                    skillActions: [
                        {
                            type: AnimationType.HealerBasicAttack, 
                            url: "./Models/HealerAnimations/MageAttack.fbx"
                        }
                    ]
                }
            });

    }
}
