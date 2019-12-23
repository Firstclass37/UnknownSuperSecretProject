import { CameraComponent } from "../Components/camera-component";
import { ISystem, IEngine} from "adane-ecs";
import { CameraMoveComponent } from "../Components/camera-move-component";
import { InputComponent } from "adane-ecs-input";
import { TestComponent } from "../Components/test-component";


export class CameraScrollSystem implements ISystem {

    update(engine: IEngine): void {
        let cameraMove = engine.entities.findOne(CameraComponent).get(CameraMoveComponent);
        let keyboard = engine.entities.findOne(InputComponent, TestComponent).get(InputComponent);
        
        if (!keyboard.hit){
            return;
        }
        
        engine.entities.findOne(CameraMoveComponent).get(CameraMoveComponent).followPlayer = false;

        let step = 10;

        let offsetX = -10;
        let offsetY = -10;

        cameraMove.offsetX = offsetX;
        cameraMove.offsetY = offsetY;
        cameraMove.stepSize = step;
    }

}