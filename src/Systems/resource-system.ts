import { ISystem, IEngine } from "adane-ecs"
import { PlayerComponent } from "../Components/player-component";
import { PositionComponent } from "../Components/position-component";
import { ResourceComponent } from "../Components/resource-component";
import { PlayerStatsComponent } from "../Components/player-stats-component";
import { DestructionComponent } from "../Components/destruction-component";

export class ResourceSystem implements ISystem{
    update(engine: IEngine): void {
        let player = engine.entities.findOne(PlayerComponent);
        let playerPosition = player.get<PositionComponent>(PositionComponent.name);

        let resources = engine.entities.findMany(ResourceComponent);

        for(let i = 0; resources.length; i++){
            let resource = resources[i];
            let destruction = resource.get<DestructionComponent>(DestructionComponent.name);
            if (!destruction.destructed && playerPosition.position != resource.get<PositionComponent>(PositionComponent.name).position){
                continue;
            }

            let stats = player.get<PlayerStatsComponent>(PlayerStatsComponent.name);
            stats.resource += resource.get<ResourceComponent>(ResourceComponent.name).count;

            resource.get<DestructionComponent>(DestructionComponent.name).needDestruct = true;
        }
    }
}