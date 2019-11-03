import { Entity, IComponent } from "adane-ecs"

export class InteractionComponent implements IComponent {
    interactedWith: Entity;
}