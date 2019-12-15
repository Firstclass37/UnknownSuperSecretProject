import { ISystem, IEngine } from "adane-ecs"
import { PlayerMoveComponent } from "../Components/player-move-component";
import { PlayerComponent } from "../Components/player-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { ChangePositionComponent } from "../Components/change-position-component";

export class MoveSystem implements ISystem {
    update(engine: IEngine): void {
        let player = engine.entities.findOne(PlayerComponent);

        let playerPos = player.get(MapPositionComponent);
        let movement = engine.entities.findOne(PlayerMoveComponent).get<PlayerMoveComponent>(PlayerMoveComponent.name);
        if (!movement.path || movement.path.length == 0){
            return;
        }
        let changePos = player.get(ChangePositionComponent);
        if (changePos.complete && changePos.to){
            playerPos.mapElementNumber = changePos.to;
        }

        if (movement.path[movement.path.length - 1] != playerPos.mapElementNumber && changePos.complete){
            changePos.from = playerPos.mapElementNumber;
            changePos.to = movement.path[movement.path.indexOf(playerPos.mapElementNumber) + 1];
            changePos.complete = false;
        }     
    }
}