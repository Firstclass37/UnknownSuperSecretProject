import { ISystem, IEngine } from "adane-ecs"
import { InputComponent, PointerDownInputTrigger } from "adane-ecs-input";


export class InputTestSystem implements ISystem{


    update(engine: IEngine): void {

        let entities = engine.entities.findMany(InputComponent);

        entities.forEach(e => {
            let input = e.get(InputComponent);
            if (input.hit){
                console.log(`hit!!!!! ${e.identity}`);
            }
        });
    }

}