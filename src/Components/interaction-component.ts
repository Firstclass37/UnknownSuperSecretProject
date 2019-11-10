import { IComponent } from "adane-ecs"

export class InteractionComponent implements IComponent {
    lastInteractedWithId: string;
}