import { IAttributes } from "./IAttributes";
import { IPosition } from "./IPosition";
import { IQuaternion } from "./IQuaternion";
import { IStats } from "./IStats";

export default interface IUserCharacter {
    id: string;
    name: string;
    class: string;
    position: IPosition;
    quaternion: IQuaternion;
    attributes: IAttributes;
    stats: IStats;
    health: number;
    mana: number;
}


