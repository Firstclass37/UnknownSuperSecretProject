import { ISystem, IEngine, Entity } from "adane-ecs"
import { RenderableComponent, Renderable } from "adane-ecs-graphics"
import { Guid } from "adane-system";
import { AssetsConsts } from "../assets-consts";
import { SettingsComponent } from "../Components/settings-componen";


export class MapBuildSystem implements ISystem {

    update(engine: IEngine): void {
        let settings = engine.entities.findOne(SettingsComponent).get(SettingsComponent);

        let gameSettings = settings.gameSettings;
        let mapSettings = settings.mapSettings;

        let horizontalPadding = (gameSettings.size.windowWidth - gameSettings.map.width * gameSettings.size.spriteWidth) / 2;
        let verticalPadding = (gameSettings.size.windowHieght - gameSettings.map.hieght * gameSettings.size.spriteHieght / 2) / 2;
        let additionalPadding = gameSettings.size.spriteWidth / 2;

        for (let row = 1; row <= gameSettings.map.hieght; row++){
            for(let column = 1; column <= gameSettings.map.width; column++){
                if (row % 2 == 0 && column == gameSettings.map.width){
                    break;
                }

                let curPadding = row % 2 == 0 ? additionalPadding : 0;

                let x = horizontalPadding + (column - 1) * (gameSettings.size.spriteWidth ) + curPadding;
                let y = verticalPadding + (row - 1) * (gameSettings.size.spriteHieght / 2 );

                let position = (row - 1) * gameSettings.map.width + column - 1;

                engine.entities.add(this.createMapElement(x, y, position));
            }
        }
        engine.removeSystem(this);
    }


    private createMapElement(x: number, y: number, position: number): Entity{
        let renderable = this.createRenderable(AssetsConsts.mapElementSprite2, `mapElement${x},${y}`, x, y);
        return new Entity(Guid.newGuid(), renderable);
    }

    private createPlayer(x: number, y: number, position: number): Entity{
        let renderable = this.createRenderable(AssetsConsts.playerSprite, `player`, x, y);
        return new Entity(Guid.newGuid(), renderable);
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