import { ISystem, IEngine } from "adane-ecs"
import { InputComponent } from "../Components/input-component";

export class InputSystem implements ISystem {
    update(engine: IEngine): void {
        let input = engine.entities.findOne(InputComponent).get<InputComponent>(InputComponent.name);
        input.lastInputX = undefined;
        input.lastInputY = undefined;

        if (false){
            //detect input and set coordinates
            input.lastInputX = undefined;
            input.lastInputY = undefined;
        }
    }
}