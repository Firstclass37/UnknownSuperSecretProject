import { ISystem, IEngine } from "adane-ecs"
import { PositionComponent } from "../Components/position-component";
import { PlayerComponent } from "../Components/player-component";
import { BonusComponent } from "../Components/bonus-component";
import { BonusActivityComponent } from "../Components/bonus-activity-component";
import { PlayerStatsComponent } from "../Components/player-stats-component";
import { DestructionComponent } from "../Components/destruction-component";

export class BonusActivationSystem implements ISystem{

    update(engine: IEngine): void {
        let player = engine.entities.findOne(PlayerComponent);
        let playerPosition = player.get<PositionComponent>(PositionComponent.name);

        let bonuses = engine.entities.findMany(BonusComponent);

        for(let i = 0; bonuses.length; i++){
            let bonus = bonuses[i];
            let activity = bonus.get<BonusActivityComponent>(BonusActivityComponent.name);
            let destruction = bonus.get<DestructionComponent>(DestructionComponent.name);

            if (destruction.destructed || activity.activated || playerPosition.position != bonus.get<PositionComponent>(PositionComponent.name).position){
                continue;
            }

            let stats = player.get<PlayerStatsComponent>(PlayerStatsComponent.name);
            stats.someBonusStats += bonus.get<BonusComponent>(BonusComponent.name).value;

            activity.activated = true;
            activity.activationTime = engine.time.total;
            destruction.needDestruct = true;
        }
    }
}