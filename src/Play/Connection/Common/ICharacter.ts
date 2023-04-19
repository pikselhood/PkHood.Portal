import { IPosition } from "./IPosition";
import { IQuaternion } from "./IQuaternion";

export default interface ICharacter {
    id: string;
    name: string;
    class: string;
    position: IPosition;
    quaternion: IQuaternion;
    maxHealth: number;
    maxMana: number;
    health: number;
    mana: number;
}


