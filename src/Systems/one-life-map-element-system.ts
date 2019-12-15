import { ISystem, IEngine, Entity } from "adane-ecs"
import { MapElementComponent } from "../Components/map-element-component";
import { ChangePositionComponent } from "../Components/change-position-component";
import { DestructionComponent } from "../Components/destruction-component";

export class OneLifeMapElementSystem implements ISystem {
    update(engine: IEngine): void {
        let changePosition = engine.entities.findOne(ChangePositionComponent).get(ChangePositionComponent);
        if (changePosition.from && changePosition.complete){
            let entity = this.findElement(changePosition.from, engine);
            let destruction = entity.get(DestructionComponent);
            if (!destruction.needDestruct){
                destruction.needDestruct = true;
            }
        }    
    }

    private findElement(num: number, engine: IEngine): Entity{
        return engine.entities.findMany(MapElementComponent)
            .filter(e => e.get<MapElementComponent>(MapElementComponent.name).num == num)[0];
    }
}