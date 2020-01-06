import { ISystem, IEngine, Entity } from "adane-ecs"
import { RenderableComponent, Renderable } from "adane-ecs-graphics"
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { MapObjectRenderQueueComponent } from "../Components/map-object-render-queue-component";
import { Guid } from "adane-system";
import { MapElementExtentions } from "../Helpers/map-element-extentions";
import { RenderableExtentions } from "../Helpers/renderable-extentions";

export class MapObjectRenderSystem implements ISystem{


    update(engine: IEngine): void {
        if (engine.time.total < 200){
            return;
        }

        let entities = engine.entities.findMany(MapObjectRenderQueueComponent).sort((n1, n2) => n1.get(MapObjectRenderQueueComponent).priority - n2.get(MapObjectRenderQueueComponent).priority);
        for(let i = 0; i < entities.length; i++){
            let currEntity = entities[i];
            if (!currEntity.has(RenderableComponent.name)){
                this.init(engine, currEntity);
            }
        }
    }

    private init(egine: IEngine, entity: Entity): void{
        let queueInfo = entity.get(MapObjectRenderQueueComponent);
        let absoluteMapPosition = MapElementExtentions.find(egine, queueInfo.mapPosition).get(AbsolutePositionComponent);
        
        let x = absoluteMapPosition.x + queueInfo.offsetX;
        let y = absoluteMapPosition.y + queueInfo.offsetY;
        
        entity.add(RenderableExtentions.createRenderable(queueInfo.asset, Guid.newGuid(), x, y));
        entity.add(new AbsolutePositionComponent(x, y));
    }
}