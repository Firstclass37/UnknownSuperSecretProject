import { CameraComponent } from "../Components/camera-component";
import { ISystem, IEngine} from "adane-ecs";
import { SettingsComponent } from "../Components/settings-componen";
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { PlayerComponent } from "../Components/player-component";
import { CameraMoveComponent } from "../Components/camera-move-component";


export class CameraFollowSystem implements ISystem{

    update(engine: IEngine): void {
        let camera = engine.entities.findOne(CameraComponent);
        let cameraMove = camera.get(CameraMoveComponent);
        let cameraComp = camera.get(CameraComponent);
        let player = engine.entities.findOne(PlayerComponent, AbsolutePositionComponent);
        if (!cameraMove.followPlayer || !player){
            return;
        }
        
        let settings = engine.entities.findOne(SettingsComponent).get(SettingsComponent).gameSettings;
        let playerPos = player.get(AbsolutePositionComponent);

        cameraMove.offsetX = cameraComp.width / 2 - (playerPos.x + settings.size.spriteWidth / 2);
        cameraMove.offsetY = cameraComp.height / 2 - (playerPos.y + settings.size.spriteWidth / 2);
        cameraMove.stepSize = 2;
    }
}