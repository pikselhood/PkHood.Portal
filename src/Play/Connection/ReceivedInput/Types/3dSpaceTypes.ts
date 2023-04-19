import { IPosition as ICommonPosition } from "../../Common/IPosition";
import { IQuaternion as ICommonQuaternion } from "../../Common/IQuaternion";

export interface IPosition {
    characterId: string;
    position: ICommonPosition;
}

export interface IQuaternion {
    characterId: string;
    quaternion: ICommonQuaternion;
}
