import { IPosition, IQuaternion } from "./Types/3dSpaceTypes";
import { ICharacterHealth, ICharacterMana, ICharacterStats, ICharacterLevel } from "./Types/CharacterStatTypes";
import { IActiveCharacters, IAddCharacter, IDeleteCharacter, IClientCharacter } from "./Types/ConnectionTypes";
import { IJumpState, IMoveState, ISkillState } from "./Types/StateTypes";


export default class ReceivedInput {

    public userCharacter: ((data: IClientCharacter) => void)[] = [];
    public activeCharacters: ((data: IActiveCharacters) => void)[] = [];
    public addCharacter: ((data: IAddCharacter) => void)[] = [];
    public deleteCharacter: ((data: IDeleteCharacter) => void)[] = [];
    public position: ((data: IPosition) => void)[] = [];
    public quaternion: ((data: IQuaternion) => void)[] = [];
    public moveState: ((data: IMoveState) => void)[] = [];
    public jumpState: ((data: IJumpState) => void)[] = [];
    public skillState: ((data: ISkillState) => void)[] = [];
    public characterHealth: ((data: ICharacterHealth) => void)[] = [];
    public characterMana: ((data: ICharacterMana) => void)[] = [];
    public characterStats: ((data: ICharacterStats) => void)[] = [];
    public characterLevel: ((data: ICharacterLevel) => void)[] = [];


    public NewInput(input: any): void {

        let data: any;

        switch (input.type) {
            case 0:
                data = input.data as IClientCharacter;
                this.userCharacter.forEach(x => x(data));
                break;
            case 1:
                data = input.data as IActiveCharacters;
                this.activeCharacters.forEach(x => x(data));
                break;
            case 2:
                data = input.data as IAddCharacter;
                this.addCharacter.forEach(x => x(data));
                break;
            case 3:
                data = input.data as IDeleteCharacter;
                this.deleteCharacter.forEach(x => x(data));
                break;
            case 16:
                data = input.data as IPosition;
                this.position.forEach(x => x(data));
                break;
            case 17:
                data = input.data as IQuaternion;
                this.quaternion.forEach(x => x(data));
                break;
            case 32:
                data = input.data as IMoveState;
                this.moveState.forEach(x => x(data));
                break;
            case 33:
                data = input.data as IJumpState;
                this.jumpState.forEach(x => x(data));
                break;
            case 34:
                data = input.data as ISkillState;
                this.skillState.forEach(x => x(data));
                break;
            case 48:
                data = input.data as ICharacterHealth;
                this.characterHealth.forEach(x => x(data));
                break;
            case 49:
                data = input.data as ICharacterMana;
                this.characterMana.forEach(x => x(data));
                break;
            case 50:
                data = input.data as ICharacterStats;
                this.characterStats.forEach(x => x(data));
                break;
            case 51:
                data = input.data as ICharacterLevel;
                this.characterLevel.forEach(x => x(data));
                break;
            default:
                return;
        }


    }

}