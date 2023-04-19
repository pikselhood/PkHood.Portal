export interface IPosition {
    X: number;
    Y: number;
    Z: number;
}

export interface IQuaternion {
    W: number;
    X: number;
    Y: number;
    Z: number;
}

export interface IReceivedPlayer {
    Id: string;
    Name: string;
    Class: string;
    Position: IPosition;
    Quaternion: IQuaternion;
    MoveState: string,
    JumpState: number,
    Health: number,
}