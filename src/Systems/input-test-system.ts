import { ISystem, IEngine } from "adane-ecs"
import { InputComponent } from "adane-ecs-input";
import { MapElementComponent } from "../Components/map-element-component";


export class InputTestSystem implements ISystem{


    update(engine: IEngine): void {

        let entities = engine.entities.findMany(InputComponent);

        entities.forEach(e => {
            let input = e.get(InputComponent);
            if (input.hit){
                let mapElem = e.get(MapElementComponent);
                let mapElemeNum = mapElem ? mapElem.num : 0;

                console.log(`hit!!!!! ${e.identity}, ${mapElemeNum}`);
            }
        });
    }
}