import { ISystem, IEngine } from "adane-ecs"
import { PositionComponent } from "../Components/position-component";
import { PlayerComponent } from "../Components/player-component";
import { BonusComponent } from "../Components/bonus-component";
import { BonusActivityComponent } from "../Components/bonus-activity-component";
import { PlayerStatsComponent } from "../Components/player-stats-component";

export class BonusActivationSystem implements ISystem{

    update(engine: IEngine): void {
        let player = engine.entities.findOne(PlayerComponent);
        let playerPosition = player.get<PositionComponent>(PositionComponent.name);

        let resources = engine.entities.findMany(BonusComponent);

        for(let i = 0; resources.length; i++){
            let resource = resources[i];
            let activity = resource.get<BonusActivityComponent>(BonusActivityComponent.name);

            if (activity.activated || playerPosition.position != resource.get<PositionComponent>(PositionComponent.name).position){
                continue;
            }

            let stats = player.get<PlayerStatsComponent>(PlayerStatsComponent.name);
            stats.someBonusStats += resource.get<BonusComponent>(BonusComponent.name).value;

            activity.activated = true;
            activity.activationTime = engine.time.total;
        }
    }
}