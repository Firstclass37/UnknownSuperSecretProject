import { ISystem, IEngine, IInitializableEvent, Entity } from "adane-ecs";
import { InitSystem } from "./init-system";
import { Task } from "adane-ecs-tasks";
import { LoadAssetTask } from "adane-ecs-graphics-ext"
import { RenderableComponent, Renderable, SpriteObject } from "adane-ecs-graphics"
import { MapBuildSystem } from "./map-build-system";


export class BootstrapSystem implements ISystem, IInitializableEvent{

    initialize(engine: IEngine): void {

        // Task.start(this, new LoadAssetTask('squareAssetLoading', ['./assets/square.png']))
        //     .onComplete((t) => engine.addSystem(new MapBuildSystem()))

        Task.start(this, new LoadAssetTask('test', ['./assets/simplePlayer.png']))
            .onComplete((t) => engine.entities.add(new Entity(new RenderableComponent(Renderable.define((factory) => factory.sprite( { texture: "./assets/simplePlayer.png", name: "mysprite"} ))))));
    }

    update(engine: IEngine): void {

        let entity = engine.entities.findOne(RenderableComponent);
        if (entity){
            entity.get(RenderableComponent).renderable.set(SpriteObject, "mysprite", (x) => x.position = {x: 100, y: 100});
        }

    }

}