import { ISystem, IEngine, Entity } from "adane-ecs";
import { PlayerComponent } from "../Components/player-component";
import { GameEndComponent } from "../Components/game-end-component";
import { Guid } from "adane-system";
import { DoorComponent } from "../Components/door-component";
import { MapPositionComponent } from "../Components/map-position-component";

export class GameEndSystem implements ISystem{
    update(engine: IEngine): void {
        let endGameComp = engine.entities.findOne(GameEndComponent);
        if (endGameComp){
            return;
        }

        if (this.levelFailed(engine)){
            engine.entities.add(new Entity(Guid.newGuid(), new GameEndComponent('Player was killed :(', false)));
        }
        else if (this.levelCompled(engine)){
            engine.entities.add(new Entity(Guid.newGuid(), new GameEndComponent('Level completed!!!', true)));
        }
        
    }

    private levelFailed(engine: IEngine): boolean{
        return engine.entities.findOne(PlayerComponent).get(PlayerComponent).alive === false;
    }

    private levelCompled(engine: IEngine): boolean{
        let door = engine.entities.findOne(DoorComponent);
        let playerPos = engine.entities.findOne(PlayerComponent).get(MapPositionComponent).mapElementNumber
        return door.get(DoorComponent).opened && door.get(MapPositionComponent).mapElementNumber === playerPos;
    }
}