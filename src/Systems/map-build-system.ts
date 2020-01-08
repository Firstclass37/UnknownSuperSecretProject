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
import { DoorComponent } from "../Components/door-component";
import { MapObjectRenderQueueComponent } from "../Components/map-object-render-queue-component";
import { AssetsConsts } from "../assets-consts";
import { EnemyComponent } from "../Components/enemy-component";
import { EnemyTrajectoryComponent } from "../Components/enemy-trajectory-component";
import { EnemyVisionComponent } from "../Components/enemy-vision-component";
import { WaitComponent } from "../Components/wait-component";


export class MapBuildSystem implements ISystem {

    update(engine: IEngine): void {
        let settings = engine.entities.findOne(SettingsComponent).get(SettingsComponent);

        let gameSettings = settings.gameSettings;
        let mapSettings = settings.mapSettings;


        let bigRowCount = gameSettings.map.width * Math.round(gameSettings.map.hieght / 2);
        let smallRowCount =  (gameSettings.map.width - 1) * Math.floor(gameSettings.map.hieght / 2);
        let totalCount = bigRowCount + smallRowCount; 

        for (let num = 1; num <= totalCount; num++){
                let blocked = false;
                
                if (mapSettings.player === num){
                    engine.entities.add(this.createPlayer(num));
                }
                else if (mapSettings.keys.indexOf(num) !== -1){
                    engine.entities.add(this.createKey(num));
                }
                else if (mapSettings.exit === num){
                    engine.entities.add(this.createExit(num));
                    blocked = true;
                }
                else if (mapSettings.trees.indexOf(num) !== -1){
                    engine.entities.add(this.createTree(num));
                    blocked = true;
                }
                else if (mapSettings.stones.indexOf(num) !== -1){
                    engine.entities.add(this.createStone(num));
                    blocked = true;
                }
                else if (mapSettings.enemies.indexOf(num) !== -1){
                    engine.entities.add(this.createEnemy(num));
                }
                engine.entities.add(this.createMapElement(num, blocked));
        }

        engine.removeSystem(this);
    }


    private createMapElement(position: number, blocked: boolean = false): Entity{
        return new Entity(
            Guid.newGuid(), 
            new MapElementComponent(position, blocked), 
            new ChangeSpriteComponent(), 
            new DestructionComponent(), 
            new ChangeCoordinatesComponent());
    }

    private createPlayer(position: number): Entity{
        return new Entity(
            Guid.newGuid(), 
            new MapPositionComponent(position),
            new PlayerComponent(),
            new PlayerMoveComponent(), 
            new ChangePositionComponent(),
            new MapObjectRenderQueueComponent(position, AssetsConsts.playerSprite, 1, 15, -12));
    }

    private createKey(position: number): Entity{
        return new Entity(
            Guid.newGuid(), 
            new KeyComponent(), 
            new MapPositionComponent(position), 
            new ChangeCoordinatesComponent(),
            new MapObjectRenderQueueComponent(position, AssetsConsts.key, 1, 15, -12));
    }

    private createExit(position: number){
        return new Entity(
            Guid.newGuid(), 
            new DoorComponent(), 
            new MapPositionComponent(position), 
            new ChangeSpriteComponent(),
            new MapObjectRenderQueueComponent(position, AssetsConsts.doorClosed, 1, 0, -20));
    }

    private createTree(position: number){
        return new Entity(
            Guid.newGuid(),  
            new MapObjectRenderQueueComponent(position, AssetsConsts.treeSprite, 1, 0, -20));
    }

    private createStone(position: number){
        return new Entity(
            Guid.newGuid(),  
            new MapObjectRenderQueueComponent(position, AssetsConsts.stoneSprite, 1, 0, -20));
    }

    private createEnemy(position: number): Entity{
        return new Entity(
            Guid.newGuid(),
            new MapObjectRenderQueueComponent(position, AssetsConsts.enemy, 1, 15, -12),
            new ChangePositionComponent(),
            new MapPositionComponent(position),
            new EnemyComponent(),
            new EnemyVisionComponent(),
            new WaitComponent(),
            new EnemyTrajectoryComponent()
        );
    }
}