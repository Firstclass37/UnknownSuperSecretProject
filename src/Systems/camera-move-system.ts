import { CameraComponent } from "../Components/camera-component";
import { ISystem, IEngine, IInitializableEvent, Entity } from "adane-ecs";
import { SettingsComponent } from "../Components/settings-componen";
import { MapElementComponent } from "../Components/map-element-component";
import { RenderableComponent, Renderable, SpriteObject } from "adane-ecs-graphics"
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { PlayerComponent } from "../Components/player-component";

export class CameraMoveSystem implements ISystem{


    update(engine: IEngine): void {
        let camera = engine.entities.findOne(CameraComponent);
        let playerPos = engine.entities.findOne(PlayerComponent);
        

        let 
    }

}