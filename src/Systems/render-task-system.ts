import { ISystem, IEngine } from "adane-ecs";
import { RenderableComponent } from "adane-ecs-graphics";
import { RenderableExtentions } from "../Helpers/renderable-extentions";
import { RenderTaskComponent } from "../Components/render-task-component";
import { Guid } from "adane-system";

export class RenderTaskSystem implements ISystem{
    update(engine: IEngine): void {
        let entities = engine.entities.findMany(RenderTaskComponent).filter(e => !e.has(RenderableComponent.name));
        for(let i = 0; i < entities.length; i++){
            let currEntity = entities[i];
            let renderTask = currEntity.get(RenderTaskComponent);
            currEntity.add(RenderableExtentions.createRenderable(renderTask.sprite, Guid.newGuid(), renderTask.x, renderTask.y))
        }
    }
}