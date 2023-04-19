import { SkillObject } from "../../Object/Skill/SkillObject";

export default class SkillWorld 
{
    private activeSkills = new Array<SkillObject>();
    private scene: THREE.Scene;

    public constructor(scene: THREE.Scene)
    {
        this.scene = scene;
    }

    public _Update(delta: number)
    {
        this.activeSkills.forEach(skill => 
            {
                skill._Update(delta);
                if(!skill.active && skill.skillShader?.object)
                {
                    this.scene.remove(skill.skillShader.object);
                    this.activeSkills = this.activeSkills.filter(x => x !== skill);
                }
            });
    }

    public AddSkill(skill: SkillObject)
    {
        if(skill.skillShader?.object)
        {
            this.activeSkills.push(skill);
            this.scene.add(skill.skillShader.object);
        }
    }
    
}