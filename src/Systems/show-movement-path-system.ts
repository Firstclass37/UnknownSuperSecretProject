import { ISystem, IEngine } from "adane-ecs"
import { PlayerMoveComponent } from "../Components/player-move-component";
import { MapElementComponent } from "../Components/map-element-component";
import { ChangeSpriteComponent } from "../Components/change-sprite-component";
import { AssetsConsts } from "../assets-consts";

export class ShowMovementPathSystem implements ISystem{
    update(engine: IEngine): void {
        let movement = engine.entities.findOne(PlayerMoveComponent).get(PlayerMoveComponent);
        if (movement.path && movement.new){
            this.show(engine, movement.path);
        }
    }

    private show(engine: IEngine, path: number[]){
        let mapElements = engine.entities.findMany(MapElementComponent).filter(e => path.indexOf(e.get(MapElementComponent).num) > -1)
        for(let i = 0; i < mapElements.length; i++){
            mapElements[i].get(ChangeSpriteComponent).asset = AssetsConsts.mapElementSelectedSprite;
        }
    }

}