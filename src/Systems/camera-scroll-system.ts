import { CameraComponent } from "../Components/camera-component";
import { ISystem, IEngine} from "adane-ecs";
import { CameraMoveComponent } from "../Components/camera-move-component";


export class CameraScrollSystem implements ISystem {

    update(engine: IEngine): void {
        let cameraMove = engine.entities.findOne(CameraComponent).get(CameraMoveComponent);
        //detect pressed keys
        if (false){
            return;
        }
        
        let step = 2;

        let offsetX = 0;
        let offsetY = 0;

        cameraMove.offsetX = offsetX;
        cameraMove.offsetY = offsetY;
        cameraMove.stepSize = step;
    }

}