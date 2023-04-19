import StateHelper from "../Utils/Helper/StateHelper";

export enum DSignal {
    Digit1,
    Digit2,
    Digit3,
    Digit4
}

export class DigitSignal 
{
    private _digit1: boolean = false;
    public get digit1() {return this._digit1;}
    private _digit2: boolean = false;
    public get digit2() {return this._digit2;}
    private _digit3: boolean = false;
    public get digit3() {return this._digit3;}
    private _digit4: boolean = false;
    public get digit4() {return this._digit4;}

    private _previousState = StateHelper.CreateState(this._digit1, this._digit2, this._digit3, this._digit4);

    public _UpdateChange()
    {
        var currentState = StateHelper.CreateState(this._digit1, this._digit2, this._digit3, this._digit4)
        this._previousState = currentState;
    }

    public set(signal: DSignal)
    {
        switch(signal) { 
            case DSignal.Digit1: { 
                this._digit1 = true;
               break; 
            } 
            case DSignal.Digit2: { 
                this._digit2 = true;
               break; 
            } 
            case DSignal.Digit3: { 
                this._digit3 = true;
               break; 
            } 
            case DSignal.Digit4: { 
                this._digit4 = true;
               break; 
            } 
         } 
    }

    public unSet(signal: DSignal)
    {
        switch(signal) { 
            case DSignal.Digit1: { 
                this._digit1 = false;
               break; 
            } 
            case DSignal.Digit2: { 
                this._digit2 = false;
               break; 
            } 
            case DSignal.Digit3: { 
                this._digit3 = false;
               break; 
            } 
            case DSignal.Digit4: { 
                this._digit4 = false;
               break; 
            } 
         } 
    }
    
    public isChange()
    {
        var currentState = StateHelper.CreateState(this._digit1, this._digit2, this._digit3, this._digit4)
        
        return this._previousState !== currentState;
    }
    
    public changedDigit()
    {
        var currentState = StateHelper.CreateState(this._digit1, this._digit2, this._digit3, this._digit4)
        
        switch(StateHelper.FindChangedIndex(this._previousState, currentState))
        {
            case 0:
                return DSignal.Digit1;
            case 1:
                return DSignal.Digit2;
            case 2:
                return DSignal.Digit3;
            case 3:
                return DSignal.Digit4;
            default:
                return null;
        }
    }
}