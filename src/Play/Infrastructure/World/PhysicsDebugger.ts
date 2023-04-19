import { World as Physics } from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import { Scene } from "three";

export default class PhysicsDebugger 
{
    private debugger: {update: () => any};

    public constructor(scene: Scene, physics: Physics) 
    {
        this.debugger = CannonDebugger(
            scene,
            physics,
        );
    }

    public _Update()
    {
        this.debugger.update();
    }

}