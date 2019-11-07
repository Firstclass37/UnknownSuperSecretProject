import { ISystem, IEngine } from "adane-ecs"
import { BonusComponent } from "../Components/bonus-component";
import { BonusActivityComponent } from "../Components/bonus-activity-component";
import { DurationComponent } from "../Components/duration-components";
import { PlayerStatsComponent } from "../Components/player-stats-component";
import { PlayerComponent } from "../Components/player-component";

export class BonusDeactivationSystem implements ISystem{
    
    update(engine: IEngine): void {
        let player = engine.entities.findOne(PlayerComponent);

        let bonuses = engine.entities.findMany(BonusComponent);

        for(let i = 0; bonuses.length; i++){
            let bonus = bonuses[i];
            let activity = bonus.get<BonusActivityComponent>(BonusActivityComponent.name);
            let duration = bonus.get<DurationComponent>(DurationComponent.name);

            if (!activity.activated || engine.time.total - activity.activationTime < duration.value){
                continue;
            }

            let stats = player.get<PlayerStatsComponent>(PlayerStatsComponent.name);
            stats.someBonusStats -= bonus.get<BonusComponent>(BonusComponent.name).value;

            activity.activated = false;
        }
    }
}