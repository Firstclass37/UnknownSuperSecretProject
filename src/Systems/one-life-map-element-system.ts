import { ISystem, IEngine, Entity } from "adane-ecs"
import { PlayerMoveComponent } from "../Components/player-move-component";
import { PlayerComponent } from "../Components/player-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { MapElementComponent } from "../Components/map-element-component";
import { DestructionComponent } from "../Components/destruction-component";

export class OneLifeMapElementSystem implements ISystem {
    update(engine: IEngine): void {
        let currentPlayerPosition = engine.entities.findOne(PlayerComponent).get<MapPositionComponent>(MapPositionComponent.name);
        let movement = engine.entities.findOne(PlayerMoveComponent).get<PlayerMoveComponent>(PlayerMoveComponent.name);
        if (movement.path.indexOf(currentPlayerPosition.mapElementNumber) > 0){
            let elementNum = movement.path[movement.path.indexOf(currentPlayerPosition.mapElementNumber) - 1];
            let entity = this.findElement(elementNum, engine);

            entity.get<DestructionComponent>(DestructionComponent.name).needDestruct = true;
        }    
    }

    private findElement(num: number, engine: IEngine): Entity{
        return engine.entities.findMany(MapElementComponent)
            .filter(e => e.get<MapElementComponent>(MapElementComponent.name).num == num)[0];
    }
}
