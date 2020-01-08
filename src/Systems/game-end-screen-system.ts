import { ISystem, IEngine, Entity } from "adane-ecs";
import { GameStateComponent } from "../Components/game-state-system";
import { Guid } from "adane-system";
import { TemporaryComponent } from "../Components/temporary-component";
import { RenderTaskComponent } from "../Components/render-task-component";
import { AssetsConsts } from "../assets-consts";

export class GameEndScreenSystem implements ISystem{
    update(engine: IEngine): void {
        let gameState = engine.entities.findOne(GameStateComponent).get(GameStateComponent);
        if (gameState.ended){
            this.createScreen(engine).forEach(e => {
                engine.entities.add(e);
            });
        }
    }

    private createScreen(engine: IEngine): Entity[]{
        let back =  new Entity(
            Guid.newGuid(),
            new TemporaryComponent(engine.time.total, 1000),
            new RenderTaskComponent(AssetsConsts.unknown_1, 0, 0)
        );

        return [back];
    }

}