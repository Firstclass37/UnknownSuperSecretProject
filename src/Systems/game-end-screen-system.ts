import { ISystem, IEngine, Entity } from "adane-ecs";
import { Guid } from "adane-system";
import { TemporaryComponent } from "../Components/temporary-component";
import { RenderTaskComponent } from "../Components/render-task-component";
import { AssetsConsts } from "../assets-consts";
import { GameEndComponent } from "../Components/game-end-component";

export class GameEndScreenSystem implements ISystem{
    update(engine: IEngine): void {
        let endEntity = engine.entities.findOne(GameEndComponent);
        if (endEntity){
            let endComp = endEntity.get(GameEndComponent);
            this.createScreen(engine, endComp.successfully, endComp.message).forEach(e => {
                engine.entities.add(e);
            });
        }
    }

    private createScreen(engine: IEngine, succ: boolean, message: string): Entity[]{
        let back =  new Entity(
            Guid.newGuid(),
            new TemporaryComponent(engine.time.total, 1000),
            new RenderTaskComponent(succ ? AssetsConsts.greeanScreen : AssetsConsts.redScreen, 0, 0)
        );

        return [back];
    }

}