import { CameraComponent } from "../Components/camera-component";
import { ISystem, IEngine, IInitializableEvent, Entity } from "adane-ecs";
import { SettingsComponent } from "../Components/settings-componen";
import { MapElementComponent } from "../Components/map-element-component";
import { RenderableComponent, Renderable, SpriteObject } from "adane-ecs-graphics"
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { PlayerComponent } from "../Components/player-component";
import { PlayerMoveComponent } from "../Components/player-move-component";
import { ChangePositionComponent } from "../Components/change-position-component";
import { MapPositionComponent } from "../Components/map-position-component";

export class CameraMoveSystem implements ISystem{


    update(engine: IEngine): void {
        let camera = engine.entities.findOne(CameraComponent).get(CameraComponent);
        let player = engine.entities.findOne(PlayerComponent, AbsolutePositionComponent);
        let settings = engine.entities.findOne(SettingsComponent).get(SettingsComponent).gameSettings;

        if (!player){
            return;
        }

        let playerPos = player.get(AbsolutePositionComponent);
        let mapElementsCoordinates = engine.entities.findMany(MapElementComponent).map(e => e.get(AbsolutePositionComponent));
        let xMin = settings.size.spriteWidth;
        let xMax = (settings.map.width + 2) * settings.size.spriteWidth;
        let yMin = settings.size.spriteWidth;
        let yMax = (Math.round(settings.map.hieght / 2) + 2) * settings.size.spriteHieght;

        let offsetX = camera.width / 2 - (playerPos.x + settings.size.spriteWidth / 2);
        let offsetY = camera.height / 2 - (playerPos.y + settings.size.spriteWidth / 2);

        offsetX = offsetX > 20 ? 0 : offsetX;
        offsetY = offsetY > 20 ? 0 : offsetY;

        let xMinElem = mapElementsCoordinates.sort(e => e.x)[0].x;
        let xMaxElem = mapElementsCoordinates.sort(e => e.x)[mapElementsCoordinates.length - 1].x;
        let yMinElem = mapElementsCoordinates.sort(e => e.y)[0].y;
        let yMaxElem = mapElementsCoordinates.sort(e => e.y)[mapElementsCoordinates.length - 1].y + offsetY;

        if (xMinElem + offsetX > xMin)
            offsetX = 0;
        if (xMaxElem + offsetX < xMax)
            offsetX = 0;
        if (yMinElem + offsetY > yMin)
            offsetY = 0;
        if (yMaxElem + offsetY < yMax)
            offsetY = 0;

        if (offsetX !== 0 || offsetY !== 0){
            this.moveAll(engine, offsetX, offsetY);
        }
        
         
    }

    private moveAll(engine: IEngine, offsetX: number, offsetY: number){
        var renderables = engine.entities.findMany(RenderableComponent);
        for(let i = 0; i < renderables.length; i ++){
            let coordinates = renderables[i].get(AbsolutePositionComponent);
            coordinates.x += offsetX;
            coordinates.y += offsetY;
            renderables[i].get(RenderableComponent).renderable.set(SpriteObject, ".", (o) => { o.position = { x: coordinates.x, y: coordinates.y} }); 
        }
    }

}

class Offset{
    constructor(public x: number, public y: number){}
}