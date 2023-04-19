import { JumpSignal, JSignal as JSignal } from "../../Signals/JumpSignal";
import { MoveSignal, MSignal as MSignal } from "../../Signals/MoveSignal";

export default class StateHelper {

    static ParseMoveState(moveSignal: MoveSignal) {
        let state = ""
        if (moveSignal.forward && !moveSignal.backward) {
            state = "f";
        } else if (moveSignal.backward && !moveSignal.forward) {
            state = "b"
        }
        if (moveSignal.right && !moveSignal.left) {
            state = state + "r";
        } else if (moveSignal.left && !moveSignal.right) {
            state = state + "l"
        }
        return state;
    }

    static ParseJumpState(jumpSignal: JumpSignal) {
        if (jumpSignal.jump) {
            return 1
        } else { return 0 }
    }

    static ParseMoveString(str: string) {
        const moveSignal = new MoveSignal();
        for (let i = 0; i < str.length; i++) {
            switch (str.charAt(i)) {
                case "f":
                    moveSignal.set(MSignal.Forward)
                    break;
                case "b":
                    moveSignal.set(MSignal.Backward)
                    break;
                case "r":
                    moveSignal.set(MSignal.Right)
                    break;
                case "l":
                    moveSignal.set(MSignal.Left)
                    break;

                default:
                    break;
            }
        }
        return moveSignal;
    }

    static ParseJumpNumber(number: number) {
        const jumpSignal = new JumpSignal();
        switch (number) {
            case 1:
                jumpSignal.set(JSignal.Jump)
                break;
            case 0:
                jumpSignal.unSet(JSignal.Jump)
                break;

            default:
                break;
        }
        
        return jumpSignal;
    }
}
