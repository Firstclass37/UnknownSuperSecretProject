import { ISystem, IEngine } from "adane-ecs";
import { TemporaryComponent } from "../Components/temporary-component";
import { RenderableComponent } from "adane-ecs-graphics";

export class TemporarySystem implements ISystem{
    update(engine: IEngine): void {
        let entities = engine.entities.findMany(TemporaryComponent);
        for(let i = 0; i < entities.length; i++){
            let currEntity = entities[i];
            let temporary = currEntity.get(TemporaryComponent);
            if (engine.time.total > temporary.start + temporary.duration){
                if (currEntity.has(RenderableComponent.name)){
                    currEntity.remove(RenderableComponent.name);
                }
                engine.entities.remove(currEntity);
            }
        }
    }
}