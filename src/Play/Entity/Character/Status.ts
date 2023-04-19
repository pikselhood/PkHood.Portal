import CharacterBaseObject from "../../Object/Character/CharacterObject/CharacterBaseObject";
import Skill from "../Skill";
import Character from "./Character";
import * as SkillObject from "../../Object/Skill/SkillObject";
import World from "../../Infrastructure/World/World";
import Signals from "../../Infrastructure/Signals/Signals";

export enum SkillStatus {
    Ready,
    Casting,
    Casted
}

export default class Status
{
    public characterObject: CharacterBaseObject; 
    public world: World;
    
    public skillStatus = SkillStatus.Ready; 
    public castStartTime = Date.now();
    public castEndTime = Date.now();
    public castingSkill?: Skill;
    public castingTarget?: Character;
    public castedCallback?: () => void;
    public canceledCallBack?: () => void;

    public constructor(characterObject: CharacterBaseObject, world: World)
    {
        this.characterObject = characterObject;
        this.world = world;
    }

    public _Update(signals: Signals)
    {
        if (this.skillStatus === SkillStatus.Casting)
        {
            if (signals.moveSignal.anyMove() || signals.jumpSignal.any())
            {
                this.cancelCast();
            }
            else 
            {
                this.updateCastBar();
            }
        }
        else if (this.skillStatus === SkillStatus.Casted)
        {
            this.executeSkill();
        }
    }

    public castSkill(skill?: Skill, target?: Character, castedCallback?: () => void, canceledCallBack?: () => void)
    {
        if (this.skillStatus === SkillStatus.Ready)
        {
            this.castingSkill = skill;
            this.castingTarget = target;
    
            this.castStartTime = Date.now();
            this.castEndTime = Date.now() + (this.castingSkill?.castTime ?? 0);
            this.skillStatus = SkillStatus.Casting;
            this.castedCallback = castedCallback;
            this.canceledCallBack = canceledCallBack;
        }
    }

    private updateCastBar()
    {
        const castBar = this.characterObject.header.castBar;

        castBar.value = this.skillProgressValue(castBar.max);
        
        if(this.castEndTime <= Date.now())
        {
            this.skillStatus = SkillStatus.Casted;
            castBar.value = 0;
        }
    }

    private skillProgressValue(max: number)
    {
        const castTime = this.castingSkill?.castTime ?? 0;
        const progressTime = Date.now() - this.castStartTime;

        if (castTime === 0) return max;

        return progressTime * max / castTime;
    }

    private executeSkill()
    {
        this.skillStatus = SkillStatus.Ready;

        this.castedCallback?.();
        
        if (this.castingTarget)
        {
            var skillObject: SkillObject.SkillObject;
            switch (this.castingSkill?.id) 
            {
                case 1:
                    skillObject = new SkillObject.WarriorBasicAttackObject(this.characterObject.handPosition, this.castingTarget.characterObject.handPosition);
                    break;
                case 2:
                    skillObject = new SkillObject.ArcherBasicAttackObject(this.characterObject.handPosition, this.castingTarget.characterObject.handPosition);
                    break;
                case 3:
                    skillObject = new SkillObject.MageBasicAttackObject(this.characterObject.handPosition, this.castingTarget.characterObject.handPosition);
                    break;
                case 4:
                    skillObject = new SkillObject.HealerBasicAttackObject(this.characterObject.handPosition, this.castingTarget.characterObject.handPosition);
                    break;
                default:
                    skillObject = new SkillObject.WarriorBasicAttackObject(this.characterObject.handPosition, this.castingTarget.characterObject.handPosition);
                    break;
            }

            this.world.skillWorld.AddSkill(skillObject);
        }
    }

    private cancelCast()
    {
        this.skillStatus = SkillStatus.Ready;
        this.characterObject.header.castBar.value = 0;
        this.canceledCallBack?.();
    }
}