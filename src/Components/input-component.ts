import { IComponent } from "adane-ecs"

export class InputComponent implements IComponent{
    lastInputX: number;
    lastInputY: number;
}