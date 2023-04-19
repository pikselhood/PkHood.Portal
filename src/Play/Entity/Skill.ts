import { IStats } from "../Connection/Common/IStats";
import { AnimationType } from "../Infrastructure/Animation/AnimationType";
import Character from "./Character/Character";
import { SkillStatus } from "./Character/Status";


export default class Skill{

    public static WarriorBasicAttack = new Skill(1, 0, 5, 1000, 1, AnimationType.WarriorBasicAttack);
    public static ArcherBasicAttack = new Skill(2, 0, 35, 1000, 1, AnimationType.ArcherBasicAttack);
    public static MageBasicAttack = new Skill(3, 0, 30, 1000, 1000, AnimationType.MageBasicAttack);
    public static HealerBasicAttack = new Skill(4, 0, 30, 1000, 1, AnimationType.HealerBasicAttack);

    public static AllSkills = [
        Skill.WarriorBasicAttack,
        Skill.ArcherBasicAttack,
        Skill.MageBasicAttack,
        Skill.HealerBasicAttack
    ];

    public static AllWarriorSkills = [Skill.WarriorBasicAttack];
    public static AllArcherSkills = [Skill.ArcherBasicAttack];
    public static AllMageSkills = [Skill.MageBasicAttack];
    public static AllHealerSkills = [Skill.HealerBasicAttack];

    public id: number;
    public cooldown: number;
    public mana: number;
    public range: number;
    public castTime: number;
    public animationType: AnimationType;

    public canBeUsedAt: number;

    public constructor(id: number, mana: number, range: number, cooldown: number, castTime: number, animationType: AnimationType) {
        this.id = id;
        this.mana = mana;
        this.range = range;
        this.cooldown = cooldown;
        this.castTime = castTime;
        this.animationType = animationType;
        this.canBeUsedAt = Date.now();
    }

    public validate(userCharacter: Character, target?: Character)
    {
        if (this.isNotOnCooldown() && 
            this.isEnoughMana(userCharacter) && 
            this.isInRange(userCharacter, target) && 
            this.isCharacterReady(userCharacter))
        {
            return true;
        }
        return false;
    }

    public cast(stats: IStats)
    {
        this.canBeUsedAt = Date.now() + this.calculateCooldown(stats);
    }

    private calculateCooldown(stats: IStats) 
    {
        return this.cooldown * (1 - stats.cdReduction);
    }

    private isNotOnCooldown()
    {
        return this.canBeUsedAt <= Date.now()
    }

    private isEnoughMana(userCharacter: Character)
    {
        return this.mana <= userCharacter.mana;
    }

    private isInRange(userCharacter: Character, target?: Character)
    {
        if (target)
        {
            const userPos = userCharacter.characterObject.object.position;
            const targetPos = target.characterObject.object.position;

            return userPos.distanceTo(targetPos) <= this.range;
        }
    }

    private isCharacterReady(userCharacter: Character)
    {
        return userCharacter.status.skillStatus === SkillStatus.Ready;
    }

}
