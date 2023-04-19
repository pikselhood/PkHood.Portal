import Stats from "three/examples/jsm/libs/stats.module";
import { IUIState } from "../Utils/UIStateType";
import Game from "./Game/Game";
import Hud from "./Game/Hud";

let prevTime = performance.now();
const stats = Stats();
let game: Game;
let hud: Hud;

export default init;

function init(
    generalState: IUIState,
    setGeneralState: React.Dispatch<React.SetStateAction<IUIState>>
) {
    document.body.appendChild(stats.dom);

    hud = new Hud(generalState, setGeneralState);
    game = new Game(hud);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    const delta = calculateDelta();

    game._Update(delta);

    stats.update();
}

function calculateDelta(): number {
    const time = performance.now();

    const delta = Math.min((time - prevTime) / 1000, 0.1);

    prevTime = time;

    return delta;
}
