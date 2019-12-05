import { ISystem, IEngine, Entity } from "adane-ecs"
import { PlayerMoveComponent } from "../Components/player-move-component";
import { MapElementComponent } from "../Components/map-element-component";
import { SelectComponent } from "../Components/select-component";
import { ChangeSpriteComponent } from "../Components/change-sprite-component";
import { AssetsConsts } from "../assets-consts";

export class ShowMovementPathSystem implements ISystem{
    update(engine: IEngine): void {
        let movement = engine.entities.findOne(PlayerMoveComponent).get(PlayerMoveComponent);
        if (movement.path){
            this.show(engine, movement.path);
        }
    }

    private show(engine: IEngine, path: number[]){
        let mapElements = engine.entities.findMany(MapElementComponent).filter(e => path.indexOf(e.get(MapElementComponent).num) > -1)
        for(let i = 0; i < mapElements.length; i++){
            let curEntity = mapElements[i];

            if (!curEntity.get(SelectComponent).once){
                curEntity.get(SelectComponent).once = true;
                curEntity.get(ChangeSpriteComponent).asset = AssetsConsts.mapElementSelectedSprite;
            }
        }
    }

}