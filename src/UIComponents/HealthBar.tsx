import { IUIState } from "../Utils/UIStateType";

function HealthBar(props: Partial<IUIState>) {
    return (
        <div className="health-bar-wrapper z-index fixed">
            <div>{props.name}</div>
            <div>{props.health?.toFixed(0)}</div>
            <div>{props.mana?.toFixed(0)}</div>
        </div>
    );
}

export default HealthBar;
