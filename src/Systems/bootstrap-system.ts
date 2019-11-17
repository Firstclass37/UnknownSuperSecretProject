import { ISystem, IEngine } from "adane-ecs";
import { InitSystem } from "./init-system";

export class BootstrapSystem implements ISystem{

    update(engine: IEngine): void {


        if (true){
            engine.addSystem(new InitSystem());
        }
    }

}