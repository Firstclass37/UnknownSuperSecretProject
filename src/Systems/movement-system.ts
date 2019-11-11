import { ISystem, IEngine } from "adane-ecs"
import { InteractionComponent } from "../Components/interaction-component";
import { MapElementComponent } from "../Components/map-element-component";
import { PlayerMoveComponent } from "../Components/player-move-component";
import { PlayerComponent } from "../Components/player-component";
import { MapPositionComponent } from "../Components/map-position-component";

export class MovementSystem implements ISystem {
    update(engine: IEngine): void {
        let interacted = engine.entities.findOne(InteractionComponent).get<InteractionComponent>(InteractionComponent.name);
        if (interacted){
            let entity = engine.entities.get(interacted.lastInteractedWithId);
            if (entity.has(MapElementComponent.name)){
                let targetPosition = entity.get<MapElementComponent>(MapElementComponent.name);
                let currentPlayerPosition = engine.entities.findOne(PlayerComponent).get<MapPositionComponent>(MapPositionComponent.name);

                let movement = engine.entities.findOne(PlayerMoveComponent).get<PlayerMoveComponent>(PlayerMoveComponent.name);
                movement.path = this.BuildPath(currentPlayerPosition.mapElementNumber, targetPosition.num);
            }
        }
    }

    private BuildPath(start: number, end: number): number[]{
        //search path 
        return [];
    }

}