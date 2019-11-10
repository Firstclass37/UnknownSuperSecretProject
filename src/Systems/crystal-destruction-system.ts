import { ISystem, IEngine } from "adane-ecs"
import { DestructionComponent } from "../Components/destruction-component";
import { CrystalComponent } from "../Components/crystal-component";

export class CrystalDestructionSystem implements ISystem{

    update(engine: IEngine): void {
        let crystals = engine.entities.findMany(CrystalComponent);

        for(let i = 0; crystals.length; i++){
            let bonus = crystals[i];
            let destruction = bonus.get<DestructionComponent>(DestructionComponent.name);

            if (destruction.needDestruct && !destruction.destructed){
                //some logic for destruction   
                destruction.destructed = true;
            }
        }
    }
}