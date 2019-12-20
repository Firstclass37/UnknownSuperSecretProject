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
        let player = engine.entities.findOne(PlayerComponent, AbsolutePositionComponent);
        if (!player){
            return;
        }

        let camera = engine.entities.findOne(CameraComponent).get(CameraComponent);
        let settings = engine.entities.findOne(SettingsComponent).get(SettingsComponent).gameSettings;

        let playerPos = player.get(AbsolutePositionComponent);
        let mapElementsCoordinates = engine.entities.findMany(MapElementComponent).map(e => e.get(AbsolutePositionComponent));
        let xMin = settings.size.spriteWidth;
        let xMax = camera.width - 2 * settings.size.spriteWidth;
        let yMin = settings.size.spriteWidth;
        let yMax = camera.height - 2 * settings.size.spriteWidth;

        let offsetX = camera.width / 2 - (playerPos.x + settings.size.spriteWidth / 2);
        let offsetY = camera.height / 2 - (playerPos.y + settings.size.spriteWidth / 2);

        //offsetX = Math.abs(offsetX) < 10 ? 0 : offsetX;
        //offsetY = Math.abs(offsetY) < 10 ? 0 : offsetY;

        let xMinElem = mapElementsCoordinates.sort((n1,n2) => n1.x - n2.x)[0].x;
        let xMaxElem = mapElementsCoordinates.sort((n1,n2) => n1.x - n2.x)[mapElementsCoordinates.length - 1].x;
        let yMinElem = mapElementsCoordinates.sort((n1,n2) => n1.y - n2.y)[0].y;
        let yMaxElem = mapElementsCoordinates.sort((n1,n2) => n1.y - n2.y)[mapElementsCoordinates.length - 1].y;

        if (xMinElem + offsetX > xMin)
            offsetX = xMin - xMinElem;
        if (xMaxElem + offsetX < xMax)
            offsetX = xMax - xMaxElem;
        if (yMinElem + offsetY > yMin)
            offsetY = yMin - yMinElem;
        if (yMaxElem + offsetY < yMax)
            offsetY = yMax - yMaxElem;

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