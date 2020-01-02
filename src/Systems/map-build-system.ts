import { ISystem, IEngine, Entity } from "adane-ecs"
import { Guid } from "adane-system";
import { SettingsComponent } from "../Components/settings-componen";
import { MapElementComponent } from "../Components/map-element-component";
import { ChangeSpriteComponent } from "../Components/change-sprite-component"
import { MapPositionComponent} from "../Components/map-position-component"
import { PlayerComponent } from "../Components/player-component";
import { PlayerMoveComponent } from "../Components/player-move-component";
import { ChangePositionComponent } from "../Components/change-position-component"; 
import { ChangeCoordinatesComponent } from "../Components/change-coordinates-component";
import { DestructionComponent } from "../Components/destruction-component";
import { KeyComponent } from "../Components/key-component";


export class MapBuildSystem implements ISystem {

    update(engine: IEngine): void {
        let settings = engine.entities.findOne(SettingsComponent).get(SettingsComponent);

        let gameSettings = settings.gameSettings;
        let mapSettings = settings.mapSettings;


        let bigRowCount = gameSettings.map.width * Math.round(gameSettings.map.hieght / 2);
        let smallRowCount =  (gameSettings.map.width - 1) * Math.floor(gameSettings.map.hieght / 2);
        let totalCount = bigRowCount + smallRowCount; 

        for (let num = 1; num <= totalCount; num++){
                engine.entities.add(this.createMapElement(num));
                if (mapSettings.player == num){
                    engine.entities.add(this.createPlayer(num));
                }
                else if (mapSettings.keys.indexOf(num) !== -1){
                    engine.entities.add(this.createKey(num));
                }
        }

        engine.removeSystem(this);
    }


    private createMapElement(position: number): Entity{
        return new Entity(
            Guid.newGuid(), 
            new MapElementComponent(position), 
            new ChangeSpriteComponent(), 
            new DestructionComponent(), 
            new ChangeCoordinatesComponent());
    }

    private createPlayer(position: number): Entity{
        return new Entity(Guid.newGuid(), new MapPositionComponent(position), new PlayerComponent(), new PlayerMoveComponent(), new ChangePositionComponent());
    }

    private createKey(position: number): Entity{
        return new Entity(Guid.newGuid(), new KeyComponent(), new MapPositionComponent(position), new ChangeCoordinatesComponent());
    }
}