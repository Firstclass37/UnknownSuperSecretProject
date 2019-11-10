import { ISystem, IEngine, Entity } from "adane-ecs"
import { InteractionComponent } from "../Components/interaction-component";
import { InputComponent } from "../Components/input-component";

export class InteractionSystem implements ISystem {

    update(engine: IEngine): void {
        let interaction = engine.entities.findOne(InteractionComponent).get<InteractionComponent>(InteractionComponent.name);
        interaction.lastInteractedWithId = null;

        let input = engine.entities.findOne(InputComponent).get<InputComponent>(InputComponent.name);
        if (input.lastInputX && input.lastInputY){
            let interactionWith = this.findInteraction(input.lastInputX, input.lastInputY)
            if (interactionWith){
                interaction.lastInteractedWithId = interactionWith.identity;
            }
        }
    }

    findInteraction(x: number, y: number): Entity {
        //logic for translate absolute coordinates and find enity
        return null;
    }
}