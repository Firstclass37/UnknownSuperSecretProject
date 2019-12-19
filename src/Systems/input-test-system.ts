import { ISystem, IEngine } from "adane-ecs"
import { InputComponent, PointerDownInputTrigger, KeyboardInputTrigger } from "adane-ecs-input";
import { TestComponent} from "../Components/test-component";


export class InputTestSystem implements ISystem{


    update(engine: IEngine): void {

        let entities = engine.entities.findMany(InputComponent);

        entities.forEach(e => {
            let input = e.get(InputComponent);
            if (input.hit){
                console.log(`hit!!!!! ${e.identity}`);
            }
        });

        let keyboard = engine.entities.findMany(InputComponent, TestComponent);
    }

}