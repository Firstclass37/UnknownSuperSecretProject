import { ISystem, IEngine } from "adane-ecs"
import { PlayerMoveComponent } from "../Components/player-move-component";
import { TurnCounterComponent } from "../Components/turn-counter-conponent";

export class TurnCounerSystem implements ISystem{
    update(engine: IEngine): void {
        let move = engine.entities.findOne(PlayerMoveComponent);
        if (move){
            engine.entities.findOne(TurnCounterComponent).get<TurnCounterComponent>(TurnCounterComponent.name).value++;
        }
    }
}