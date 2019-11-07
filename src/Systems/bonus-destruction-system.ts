import { ISystem, IEngine } from "adane-ecs"
import { BonusComponent } from "../Components/bonus-component";
import { DestructionComponent } from "../Components/destruction-component";

export class BonusDestructionSystem implements ISystem{

    update(engine: IEngine): void {
        let bonuses = engine.entities.findMany(BonusComponent);

        for(let i = 0; bonuses.length; i++){
            let bonus = bonuses[i];
            let destruction = bonus.get<DestructionComponent>(DestructionComponent.name);

            if (destruction.needDestruct && !destruction.destructed){
                //some logic for destruction   
            }
        }
    }
}