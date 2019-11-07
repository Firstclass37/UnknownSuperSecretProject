import { ISystem, IEngine } from "adane-ecs"
import { DestructionComponent } from "../Components/destruction-component";
import { ResourceComponent } from "../Components/resource-component";

export class ResourceDestructionComponent implements ISystem{

    update(engine: IEngine): void {
        let resources = engine.entities.findMany(ResourceComponent);

        for(let i = 0; resources.length; i++){
            let resource = resources[i];
            let destruction = resource.get<DestructionComponent>(DestructionComponent.name);

            if (destruction.needDestruct && !destruction.destructed){
                //some logic for destruction   
                destruction.destructed = true;
            }
        }
    }
}