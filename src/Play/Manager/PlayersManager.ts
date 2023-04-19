import { IActiveCharacters, IAddCharacter, IClientCharacter, IDeleteCharacter } from "../Connection/ReceivedInput/Types/ConnectionTypes";
import { IJumpState, IMoveState, ISkillState } from "../Connection/ReceivedInput/Types/StateTypes";
import StateParser from "../Infrastructure/Utils/Parser/StateParser";
import { IPosition, IQuaternion } from "../Connection/ReceivedInput/Types/3dSpaceTypes";
import { ICharacterHealth } from "../Connection/ReceivedInput/Types/CharacterStatTypes";
import World from "../Infrastructure/World/World";
import Character from "../Entity/Character/Character";
import Options from "../Options";
import { v4 as uuidv4 } from 'uuid';

export default class PlayersManager 
{
    private world: World;
    private activeCharacterList = new Array<Character>();

    public constructor(world: World) 
    {
        this.world = world;

        if (Options.DUMMY_CHARACTER)
        {
            const dummyCharacter: IAddCharacter = 
            {
                character:  
                {
                    id: uuidv4(), 
                    name: "DummyCharacter",
                    class: "warrior",
                    position: {x:0, y:0, z:0},
                    quaternion: {x:0, y:0, z:0, w:0},
                    maxHealth: 1000,
                    maxMana: 1000,
                    health: 1000,
                    mana: 400,
                }
            }

            this.addCharacter(dummyCharacter);
        }
    }

    public _Update(delta: number) 
    {
        this.activeCharacterList.forEach(pm => pm._Update(delta));
    }

    public initCharacters = (data: IActiveCharacters) => 
    {
        data.characters.forEach(x => 
        {
            const newCharacter: IAddCharacter = 
            {
                character:  
                {
                    id: x.id, 
                    name: x.name,
                    class: x.class,
                    position: x.position,
                    quaternion: x.quaternion,
                    maxHealth: x.maxHealth,
                    maxMana: x.maxMana,
                    health: x.health,
                    mana: x.mana,
                }
            }

            this.addCharacter(newCharacter);
        })        
    }

    public addCharacter = (data: IAddCharacter) => 
    {
        const newCharacter = new Character(
            {
                id: data.character.id, 
                name: data.character.name,
                class: data.character.class,
                position: data.character.position,
                quaternion: data.character.quaternion,
                health: data.character.health,
                maxHealth: data.character.maxHealth,
                mana: data.character.mana,
                maxMana: data.character.maxMana,
            }, this.world);
        
        this.activeCharacterList.push(newCharacter);
        return newCharacter;
    }

    public deleteCharacter = (data: IDeleteCharacter) => 
    {
        this.findCharacterById(data.characterId)?.delete();
        this.activeCharacterList = this.activeCharacterList.filter(x => x.id !== data.characterId);
    }

    public moveStateUpdate = (data: IMoveState) => 
    {
        this.findCharacterById(data.characterId)?.signals.moveSignal.copy(StateParser.ParseMoveString(data.moveState))
    }

    public jumpStateUpdate = (data: IJumpState) => 
    {
        this.findCharacterById(data.characterId)?.signals.jumpSignal.copy(StateParser.ParseJumpNumber(data.jumpState));
    }

    public skillStateUpdate = (data: ISkillState) => 
    {
        const target = this.findCharacterById(data.targetCharacterId);
        this.findCharacterById(data.characterId)?.castSkill(data.skillState, target);
    }

    public quaternionUpdate = (data: IQuaternion) => 
    {
        this.findCharacterById(data.characterId)?.characterObject.object.quaternion.set(data.quaternion.x, data.quaternion.y, data.quaternion.z, data.quaternion.w);
    }

    public positionUpdate = (data: IPosition) => 
    {
        this.findCharacterById(data.characterId)?.characterPhysics.body.position.set(data.position.x, data.position.y, data.position.z);
    }

    public currentHealthUpdate = (data: ICharacterHealth) => 
    {
        this.findCharacterById(data.characterId)?.changeCurrentHealth(data.health);
    }

    public maxHealthUpdate = (data: ICharacterHealth) => 
    {
        this.findCharacterById(data.characterId)?.changeMaxHealth(data.health);
    }

    public findCharacterById(characterId: string)
    {
        return this.activeCharacterList.find(x => x.id === characterId);
    }

}
