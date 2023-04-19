
export default class StateHelper{

    static CreateState(...signals: boolean[])
    {
        let state = "";
        for (let signal of signals)
        {
            state += signal ? "1" : "0";
        }
        return state;
    }

    static FindChangedIndex(previousState: string, currentState: string)
    {
        for(let i = 0; i < previousState.length; i++)
        {
            if (previousState[i] !== currentState[i])
            {
                return i;
            }
        }
        return null;
    }

}