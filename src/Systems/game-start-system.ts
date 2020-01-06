import { ISystem, IEngine, Entity } from "adane-ecs";
import { PlayerComponent } from "../Components/player-component";
import { RenderableComponent } from "adane-ecs-graphics";
import { GameStateComponent } from "../Components/game-state-system";
import { TemporaryComponent } from "../Components/temporary-component";
import { Guid } from "adane-system";
import { RenderTaskComponent } from "../Components/render-task-component";
import { AssetsConsts } from "../assets-consts";

export class GameStartSystem implements ISystem{
    update(engine: IEngine): void {
        if (engine.entities.findOne(PlayerComponent).has(RenderableComponent.name)){
            let gameState = engine.entities.findOne(GameStateComponent).get(GameStateComponent);
            if (!gameState.started){
                gameState.started = true;
                engine.entities.add(this.createStartScreen(engine));
            }
        }
    }

    private createStartScreen(engine: IEngine): Entity{
        return new Entity(
            Guid.newGuid(),
            new TemporaryComponent(engine.time.total, 1000),
            new RenderTaskComponent(AssetsConsts.unknown_1, 0, 0)
        );
    }

}