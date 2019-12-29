import { CameraComponent } from "../Components/camera-component";
import { ISystem, IEngine} from "adane-ecs";
import { CameraMoveComponent } from "../Components/camera-move-component";
import { InputComponent, Key } from "adane-ecs-input";
import { TestComponent } from "../Components/test-component";


export class CameraScrollSystem implements ISystem {

    update(engine: IEngine): void {
        let step = 10;

        let cameraMove = engine.entities.findOne(CameraComponent).get(CameraMoveComponent);
        let keyboard = engine.entities.findMany(InputComponent, TestComponent);;
        
        let offsetX = 0;
        let offsetY = 0;

        for(let i = 0; i < keyboard.length; i++){
            let currentInput = keyboard[i];
            let input = currentInput.get(InputComponent);
            if (input.hit){
                let keyName = currentInput.get(TestComponent).key;
                offsetX = this.getOffsetX(keyName, step);
                offsetY = this.getOffsetY(keyName, step);
                break;
            }
        }

        if (offsetX !== 0 || offsetY !== 0){
            engine.entities.findOne(CameraMoveComponent).get(CameraMoveComponent).followPlayer = false;
            cameraMove.offsetX = offsetX;
            cameraMove.offsetY = offsetY;
            cameraMove.stepSize = step;
        }
    }

    private getOffsetY(key: Key, step: number): number{
        if (key === Key.UP){
            return step;
        }
        if (key === Key.DOWN){
            return -step;
        }
        return 0;
    }

    private getOffsetX(key: Key, step: number): number{
        if (key === Key.LEFT){
            return step;
        }
        if (key === Key.RIGHT){
            return -step;
        }
        return 0;
    }

}