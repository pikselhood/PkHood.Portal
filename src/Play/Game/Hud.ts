import { IUIState } from "../../Utils/UIStateType";

export default class Hud
{
    public generalState: IUIState;
    public setGeneralState: React.Dispatch<React.SetStateAction<IUIState>>;

    public constructor(generalState: IUIState, setGeneralState: React.Dispatch<React.SetStateAction<IUIState>>)
    {
        this.generalState = generalState;
        this.setGeneralState = setGeneralState;
    }

    public set(type: Partial<IUIState>)
    {
        this.setGeneralState({
                ...this.generalState,
                ...type
            });
    }
}