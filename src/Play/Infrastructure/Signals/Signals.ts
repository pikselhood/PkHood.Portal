import { JumpSignal } from "./JumpSignal";
import { MoveSignal} from "./MoveSignal";
import { DigitSignal } from "./DigitSignal";

export default class Signals
{

    public moveSignal = new MoveSignal();
    public jumpSignal = new JumpSignal();
    public digitSignal = new DigitSignal();
    public onGround = true;

    public _UpdateChange()
    {
        this.moveSignal._UpdateChange();
        this.jumpSignal._UpdateChange();
        this.digitSignal._UpdateChange();
    }
}