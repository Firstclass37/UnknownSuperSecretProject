import { ISystem, IEngine, Entity } from "adane-ecs"
import { MapPositionComponent } from "../Components/map-position-component";
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { KeyComponent } from "../Components/key-component";
import { PlayerComponent } from "../Components/player-component";
import { SettingsComponent } from "../Components/settings-componen";
import { ChangeCoordinatesComponent } from "../Components/change-coordinates-component";

export class KeyTakeSystem implements ISystem{


    update(engine: IEngine): void {
        let playerPosition = engine.entities.findOne(PlayerComponent).get(MapPositionComponent).mapElementNumber;
        let keys = engine.entities.findMany(KeyComponent);
        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            let keyComp = key.get(KeyComponent);
            let keyPosition = key.get(MapPositionComponent).mapElementNumber;
            if (keyPosition === playerPosition && !keyComp.dropped){
                this.move(engine, key, keys);
                keyComp.dropped = true;
            }
        }

    }

    private move(engine: IEngine, key: Entity, otherKeys: Entity[]): void{
        let gameSettings = engine.entities.findOne(SettingsComponent).get(SettingsComponent).gameSettings;

        let currCoord = key.get(AbsolutePositionComponent);

        let x = gameSettings.size.windowWidth - 40 - 20;
        let y = 20;

        let dropped = otherKeys.filter(k => k.get(KeyComponent).dropped).map(e => e.get(AbsolutePositionComponent).x);
        if (dropped.length > 0){
            x = dropped.sort((n1, n2) => n1 - n2)[0] - 40 - 20;
        }

        let changePos = key.get(ChangeCoordinatesComponent);
        changePos.compeleted = false;
        changePos.offsetX = x - currCoord.x;
        changePos.offsetY = y - currCoord.y;
        changePos.speed = 10000;
        currCoord.staticc = true;
    }

}