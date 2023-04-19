
export enum MSignal 
{
    Forward,
    Backward,
    Right,
    Left
}

export class MoveSignal 
{
    private _forward: boolean = false;
    public get forward() { return this._forward; }
    private _backward: boolean = false;
    public get backward() { return this._backward; }
    private _right: boolean = false;
    public get right() { return this._right; }
    private _left: boolean = false;
    public get left() { return this._left; }

    private _previousState = this._forward.toString() + this._backward.toString() + this._right.toString() + this._left.toString();

    public _UpdateChange()
    {
        var currentState = this._forward.toString() + this._backward.toString() + this._right.toString() + this._left.toString();
        this._previousState = currentState;
    }

    public set(signal: MSignal) 
    {
        switch (signal) {
            case MSignal.Forward: {
                this._forward = true;
                break;
            }
            case MSignal.Backward: {
                this._backward = true;
                break;
            }
            case MSignal.Right: {
                this._right = true;
                break;
            }
            case MSignal.Left: {
                this._left = true;
                break;
            }
        }
    }

    public unSet(signal: MSignal) 
    {
        switch (signal) {
            case MSignal.Forward: {
                this._forward = false;
                break;
            }
            case MSignal.Backward: {
                this._backward = false;
                break;
            }
            case MSignal.Right: {
                this._right = false;
                break;
            }
            case MSignal.Left: {
                this._left = false;
                break;
            }
        }
    }

    public copy(moveSignal: MoveSignal) 
    {
        this._forward = moveSignal.forward
        this._backward = moveSignal.backward
        this._right = moveSignal.right
        this._left = moveSignal.left
    }

    public any() 
    {
        return (this._forward || this._backward || this._right || this._left)
    }

    public anyMove() 
    {
        return (this._forward && !this._backward) || (!this._forward && this._backward) || (this._right && !this._left) || (!this._right && this._left)     
    }

    public isChange() 
    {
        var currentState = this._forward.toString() + this._backward.toString() + this._right.toString() + this._left.toString();

        return this._previousState !== currentState;
    }
}