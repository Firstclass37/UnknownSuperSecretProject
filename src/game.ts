import { PixiHost } from "adane-ecs-hosting-pixi";
import { BootstrapSystem } from "./systems/bootstrap-system";
import { SystemLifetimeEngineExtender } from "adane-ecs";
import { TaskEngineExtender } from "adane-ecs-tasks";

export class Game{
    constructor() {
        new PixiHost(new SystemLifetimeEngineExtender(), new TaskEngineExtender()).run(
            { width: 800, height: 480 },
            [ 
                new BootstrapSystem()
            ]);
    }    
}