import UserManager from "../Manager/UserManager";
import { MSignal } from "../Infrastructure/Signals/MoveSignal";
import { JSignal } from "../Infrastructure/Signals/JumpSignal";
import { DSignal } from "../Infrastructure/Signals/DigitSignal";

export default class InputController 
{
    private userManager: UserManager;

    constructor(userManager: UserManager) 
    {
        this.userManager = userManager;
        
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
        document.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("mousemove", this.onMouseMove );
    }

    private onKeyDown = (event: any) => 
    {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                this.userManager?.setMove(MSignal.Forward);
                break;

            case "ArrowLeft":
            case "KeyA":
                this.userManager?.setMove(MSignal.Left);
                break;

            case "ArrowDown":
            case "KeyS":
                this.userManager?.setMove(MSignal.Backward);
                break;

            case "ArrowRight":
            case "KeyD":
                this.userManager?.setMove(MSignal.Right);
                break;

            case "KeyB":
                this.userManager?.user?.returnBase();
                break;

            case "Digit1":
                this.userManager?.setDigit(DSignal.Digit1);
                break;

            case "Digit2":
                this.userManager?.setDigit(DSignal.Digit2);
                break;

            case "Digit3":
                this.userManager?.setDigit(DSignal.Digit3);
                break;

            case "Digit4":
                this.userManager?.setDigit(DSignal.Digit4);
                break;

            case "Space":
                this.userManager?.setJump(JSignal.Jump);
                break;
        }
    };

    private onKeyUp = (event: any) => 
    {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                this.userManager?.unSetMove(MSignal.Forward);
                break;

            case "ArrowLeft":
            case "KeyA":
                this.userManager?.unSetMove(MSignal.Left);
                break;

            case "ArrowDown":
            case "KeyS":
                this.userManager?.unSetMove(MSignal.Backward);
                break;

            case "ArrowRight":
            case "KeyD":
                this.userManager?.unSetMove(MSignal.Right);
                break;

            case "Digit1":
                this.userManager?.unSetDigit(DSignal.Digit1);
                break;

            case "Digit2":
                this.userManager?.unSetDigit(DSignal.Digit2);
                break;

            case "Digit3":
                this.userManager?.unSetDigit(DSignal.Digit3);
                break;

            case "Digit4":
                this.userManager?.unSetDigit(DSignal.Digit4);
                break;

            case "Space":
                this.userManager?.unSetJump(JSignal.Jump);
                break;
        }
    };

    private onMouseDown = (event: any) => 
    {
        switch (event.which) {
            case 1:
                this.userManager?.setRotateOnlyCamera(true);
                this.userManager?.updateTarget(event);
                break;

            case 3:
                this.userManager?.setRotateCharacterAndCamera(true);
                break;
        }
    };

    private onMouseUp = (event: any) => 
    {
        switch (event.which) {
            case 1:
                this.userManager?.setRotateOnlyCamera(false);
                break;

            case 3:
                this.userManager?.setRotateCharacterAndCamera(false);
                break;
        }
    };

    private onMouseMove = (event: any) => 
    {
        this.userManager?.updateFocus(event);
    };


}
