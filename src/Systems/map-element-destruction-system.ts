import { ISystem, IEngine } from "adane-ecs"
import { DestructionComponent } from "../Components/destruction-component";
import { MapElementComponent } from "../Components/map-element-component";

export class MapElementDestructionSystem implements ISystem{

    update(engine: IEngine): void {
        let mapElements = engine.entities.findMany(MapElementComponent);

        for(let i = 0; mapElements.length; i++){
            let element = mapElements[i];
            let destruction = element.get<DestructionComponent>(DestructionComponent.name);

            if (destruction.needDestruct && !destruction.destructed){
                //some logic for destruction   
                destruction.destructed = true;
            }
        }
    }
}