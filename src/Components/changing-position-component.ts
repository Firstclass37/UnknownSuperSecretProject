import { IComponent } from "adane-ecs"

export class ChangingPositionComponent implements IComponent{
    newPosition: number;
    currentPosition: number;
}