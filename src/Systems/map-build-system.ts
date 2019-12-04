import { ISystem, IEngine, Entity } from "adane-ecs"
import { RenderableComponent, Renderable } from "adane-ecs-graphics"
import { Guid } from "adane-system";
import { AssetsConsts } from "../assets-consts";
import { SettingsComponent } from "../Components/settings-componen";
import { MapElementComponent } from "../Components/map-element-component";
import { ChangeSpriteComponent } from "../Components/change-sprite-component"
import { MapPositionComponent} from "../Components/map-position-component"
import { SelectComponent } from "../Components/select-component";
import { PlayerComponent } from "../Components/player-component";
import { PlayerMoveComponent } from "../Components/player-move-component";


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
        }

        engine.removeSystem(this);
    }


    private createMapElement(position: number): Entity{
        let element = new MapElementComponent(position);
        return new Entity(Guid.newGuid(), element, new ChangeSpriteComponent(), new SelectComponent());
    }

    private createPlayer(position: number): Entity{
        return new Entity(Guid.newGuid(), new MapPositionComponent(position), new PlayerComponent(), new PlayerMoveComponent());
    }

    private createTower(x: number, y: number, position: number): Entity{
        let renderable = this.createRenderable(AssetsConsts.towerSprite, `tower${position}`, x, y);
        return new Entity(Guid.newGuid(), renderable);
    }

    private createCrystal(x: number, y: number, position: number): Entity{
        let renderable = this.createRenderable(AssetsConsts.crystalSprite, `crystal${position}`, x, y);
        return new Entity(Guid.newGuid(), renderable);
    }

    private createBoot(x: number, y: number, position: number): Entity{
        let renderable = this.createRenderable(AssetsConsts.bootsSprite, `boot${position}`, x, y);
        return new Entity(Guid.newGuid(), renderable);
    }

    private createShield(x: number, y: number, position: number): Entity{
        let renderable = this.createRenderable(AssetsConsts.shieldSprite, `shield${position}`, x, y);
        return new Entity(Guid.newGuid(), renderable);
    }

    private createRenderable(asset: string, name: string, xPos: number, yPos: number): RenderableComponent{
        let component = new RenderableComponent(Renderable.define((factory) => factory.sprite( { name: name, texture: asset, position: {x: xPos, y: yPos}} )));
        return component;
    }
}