import { ISystem, IEngine } from "adane-ecs";
import { GameStateComponent } from "../Components/game-state-system";
import { PlayerComponent } from "../Components/player-component";

export class GameEndSystem implements ISystem{
    update(engine: IEngine): void {
        let gameState = engine.entities.findOne(GameStateComponent).get(GameStateComponent);
        if (gameState.ended){
            return;
        }
        if (this.wasGameEnded(engine)){
            gameState.ended = true;
        }
        
    }

    private wasGameEnded(engine: IEngine): boolean{
        return engine.entities.findOne(PlayerComponent).get(PlayerComponent).alive === false;
    }

}