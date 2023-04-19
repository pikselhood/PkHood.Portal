
export enum JSignal 
{
    Jump
}

export class JumpSignal 
{
    private _jump: boolean = false;
    public get jump() {return this._jump;}

    private _previousState = this._jump.toString();

    public _UpdateChange()
    {
        var currentState = this._jump.toString();
        this._previousState = currentState;
    }

    public set(signal: JSignal)
    {
        switch(signal) { 
            case JSignal.Jump: { 
                this._jump = true;
               break; 
            } 
         } 
    }

    public unSet(signal: JSignal)
    {
        switch(signal) { 
            case JSignal.Jump: { 
                this._jump = false;
               break; 
            } 
         } 
    }

    public copy(jumpSignal: JumpSignal)
    {
        this._jump = jumpSignal.jump;
    }

    public any()
    {
        return this._jump
    }

    public isChange()
    {
        var currentState = this._jump.toString();
        
        return this._previousState !== currentState;
    }
}