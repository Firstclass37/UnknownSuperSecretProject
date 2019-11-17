import { PixiHost } from "adane-ecs-pixi";
import { BootstrapSystem } from "./systems/BootstrapSystem";

export class Game{
    constructor() {
        new PixiHost().run(
            { width: 640, height: 360 },
            [ 
                new BootstrapSystem()
            ]);
    }    
}