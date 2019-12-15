import { ISystem, IEngine, Entity } from "adane-ecs"
import { DestructionComponent } from "../Components/destruction-component";
import { MapElementComponent } from "../Components/map-element-component";
import { AssetsConsts } from "../assets-consts";
import { ChangeCoordinatesComponent } from "../Components/change-coordinates-component";
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { SettingsComponent } from "../Components/settings-componen";
import { ChangeSpriteComponent } from "../Components/change-sprite-component";
import { GameSettings } from "../game-settings";

export class MapElementDestructionSystem implements ISystem{

    update(engine: IEngine): void {
        let mapElements = engine.entities.findMany(MapElementComponent);
        let settings = engine.entities.findOne(SettingsComponent).get(SettingsComponent).gameSettings;

        for(let i = 0; i < mapElements.length; i++){
            let element = mapElements[i];
            let destruction = element.get(DestructionComponent);

            if (destruction.needDestruct && !destruction.destructed){
                let changeCoordinates = element.get(ChangeCoordinatesComponent);
                if (!changeCoordinates.compeleted && !changeCoordinates.xFrom){
                    this.destruct(element, settings);
                }
                else if (changeCoordinates.compeleted) {
                    destruction.destructed = true;
                }
            }
        }
    }

    private destruct(entity: Entity, settings: GameSettings): void{
        let position = entity.get(AbsolutePositionComponent);
        let changeCoordinates = entity.get(ChangeCoordinatesComponent);

        changeCoordinates.compeleted = false;
        changeCoordinates.xFrom = position.x;
        changeCoordinates.yFrom = position.y;
        changeCoordinates.xTo = position.x;
        changeCoordinates.yTo = position.y + settings.size.spriteHieght / 2;

        entity.get(ChangeSpriteComponent).asset = AssetsConsts.mapElementDestructed;
    }
}