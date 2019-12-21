import { CameraComponent } from "../Components/camera-component";
import { ISystem, IEngine} from "adane-ecs";
import { SettingsComponent } from "../Components/settings-componen";
import { MapElementComponent } from "../Components/map-element-component";
import { RenderableComponent, SpriteObject } from "adane-ecs-graphics"
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { CameraMoveComponent } from "../Components/camera-move-component";

export class CameraMoveSystem implements ISystem{


    update(engine: IEngine): void {
        let camera = engine.entities.findOne(CameraComponent);
        let cameraComp = camera.get(CameraComponent);
        let cameraMove = camera.get(CameraMoveComponent);
        if (cameraMove.offsetX == 0 && cameraMove.offsetY == 0){
            return;
        }

        let settings = engine.entities.findOne(SettingsComponent).get(SettingsComponent).gameSettings;

        let mapElementsCoordinates = engine.entities.findMany(MapElementComponent).map(e => e.get(AbsolutePositionComponent));
        let xMin = settings.size.spriteWidth;
        let xMax = cameraComp.width - 2 * settings.size.spriteWidth;
        let yMin = settings.size.spriteWidth;
        let yMax = cameraComp.height - 2 * settings.size.spriteWidth;

        let xMinElem = mapElementsCoordinates.sort((n1,n2) => n1.x - n2.x)[0].x;
        let xMaxElem = mapElementsCoordinates.sort((n1,n2) => n1.x - n2.x)[mapElementsCoordinates.length - 1].x;
        let yMinElem = mapElementsCoordinates.sort((n1,n2) => n1.y - n2.y)[0].y;
        let yMaxElem = mapElementsCoordinates.sort((n1,n2) => n1.y - n2.y)[mapElementsCoordinates.length - 1].y;

        let offsetX = cameraMove.offsetX;
        let offsetY = cameraMove.offsetY;

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

        cameraMove.offsetX = 0;
        cameraMove.offsetY = 0;
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