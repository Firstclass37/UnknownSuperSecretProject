import { IComponent } from "adane-ecs"

export class PlayerMoveComponent implements IComponent{
    newPosition: number;
    currentPosition: number;
    completed: boolean;
}