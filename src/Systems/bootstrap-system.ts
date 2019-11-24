import { ISystem, IEngine, IInitializableEvent } from "adane-ecs";
import { Task } from "adane-ecs-tasks";
import { LoadAssetTask } from "adane-ecs-graphics-ext"
import { MapBuildSystem } from "./map-build-system";
import { AssetsConsts } from '../assets-consts';


export class BootstrapSystem implements ISystem, IInitializableEvent{

    initialize(engine: IEngine): void {

        Task.start(this, new LoadAssetTask('squareAssetLoading', [ AssetsConsts.mapElementSprite ]))
            .onComplete((t) => engine.addSystem(new MapBuildSystem()));
        
    }

    update(engine: IEngine): void {
    }

}