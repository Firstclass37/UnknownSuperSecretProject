import { ISystem, IEngine, Entity } from "adane-ecs"
import { DestructionComponent } from "../Components/destruction-component";
import { MapElementComponent } from "../Components/map-element-component";
import { AssetsConsts } from "../assets-consts";
import { ChangeCoordinatesComponent } from "../Components/change-coordinates-component";
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
                this.destruct(element, settings);
                destruction.destructed = true;
            }
        }
    }

    private destruct(entity: Entity, settings: GameSettings): void{
        let changeCoordinates = entity.get(ChangeCoordinatesComponent);

        changeCoordinates.compeleted = false;
        changeCoordinates.offsetX = 0;
        changeCoordinates.offsetY = settings.size.spriteHieght / 2;
        changeCoordinates.speed = 1;

        entity.get(ChangeSpriteComponent).asset = AssetsConsts.mapElementDestructed;
    }
}