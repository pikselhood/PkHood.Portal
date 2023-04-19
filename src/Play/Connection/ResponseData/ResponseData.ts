import WebSocketClient from "../WebSocketClient";
import { Position, Quaternion } from "./Models/3dSpaceModels";
import { Verification } from "./Models/ConnectionModels";
import { SelectCharacter } from "./Models/SelectModels";
import { JumpState, MoveState, SkillState } from "./Models/StateModels";

export class ResponseModel{
    public type: number;
    public data: any;

    public constructor(type: number, data: any) {
        this.type = type;
        this.data = data;
    }

}

export default class ResponseData{
    
    public GetData(data: any): ResponseModel | undefined {

        if(!data) return undefined;
        let type;

        switch(data.constructor){
            case Verification:
                type = 128;
                break;
            case Position:
                type = 144;
                break;
            case Quaternion:
                type = 145;
                break;
            case MoveState:
                type = 160;
                break;
            case JumpState:
                type = 161;
                break;
            case SkillState:
                type = 162;
                break;
            case SelectCharacter:
                type = 176;
                break;
            default:
                type = 3131;
                return;
        }

        return new ResponseModel(type, data);

    }
}