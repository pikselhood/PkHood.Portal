import { IAttributes } from "../Connection/Common/IAttributes";
import { IStats } from "../Connection/Common/IStats";
import IUserCharacter from "../Connection/Common/IUserCharacter";
import Character from "./Character/Character";
import Skill from "./Skill";

export default class User 
{
    public character: Character;
    public attributes: IAttributes;
    public stats: IStats;
    public skills: Skill[];

    constructor(type: IUserCharacter, character: Character) 
    {
        this.character = character;

        this.attributes = type.attributes;
        this.stats = type.stats;

        switch(type.class)
        {
            case "warrior":
                this.skills = Skill.AllWarriorSkills;
                break;
            case "mage":
                this.skills = Skill.AllMageSkills;
                break;
            case "archer":
                this.skills = Skill.AllArcherSkills;
                break;
            case "healer":
                this.skills = Skill.AllHealerSkills;
                break;
            default: 
                this.skills = Skill.AllWarriorSkills;
                break;
        }
        
    }

    public tryCastSkill(skillId: number, target?: Character)
    {
        const skill = this.skills.find(skill => skill.id === skillId);
        if(skill?.validate(this.character, target))
        {
            this.character.castSkill(skillId, target, () => 
            {
                skill.cast(this.stats);
            });
            return true;
        }
        return false;
    }

    public returnBase() 
    {
        this.character.characterPhysics.body.position.x = 70;
        this.character.characterPhysics.body.position.y = 10;
        this.character.characterPhysics.body.position.z = 0;
    }

}