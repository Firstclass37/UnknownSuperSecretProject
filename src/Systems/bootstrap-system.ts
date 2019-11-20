import { ISystem, IEngine, IInitializableEvent, Entity } from "adane-ecs";
import { InitSystem } from "./init-system";
import { Task } from "adane-ecs-tasks";
import { LoadAssetTask } from "adane-ecs-graphics-ext"
import { RenderableComponent, Renderable, SpriteObject } from "adane-ecs-graphics"


export class BootstrapSystem implements ISystem, IInitializableEvent{

    initialize(engine: IEngine): void {
        Task.start(this, new LoadAssetTask('test', ['./assets/simplePlayer.png']))
            .onComplete((t) => engine.entities.add(new Entity(new RenderableComponent(Renderable.define((factory) => factory.sprite( { texture: "./assets/simplePlayer.png", name: "mysprite"} ))))));
    }

    update(engine: IEngine): void {

        let entity = engine.entities.get("").get(RenderableComponent).renderable.set(SpriteObject, "mySprite", (x) => x.position = {x: 10, y: 10});

        
        

        if (true){
            engine.addSystem(new InitSystem());
        }
    }

}