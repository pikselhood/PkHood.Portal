import { useEffect, useState } from "react";
import Game from "./Play/Client";
import HealthBar from "./UIComponents/HealthBar";
import { emptyGeneralState, IUIState } from "./Utils/UIStateType";

const ReactGameRunner = () => {
    const [generalState, setGeneralState] =
        useState<IUIState>(emptyGeneralState);
    useEffect(() => {
        Game(generalState, setGeneralState);
        // return () => RemoveGame()
    }, []);
    return (
        <>
            {/* <div>{generalState.health}</div> */}
            {/* <button onClick={generalState.onRemoveGame}>Kill Game</button> */}
            <HealthBar
                name={generalState.name}
                health={generalState.health}
                maxHealth={generalState.maxHealth}
                mana={generalState.mana}
                maxMana={generalState.maxMana}
            />
        </>
    );
};

export default ReactGameRunner;
