import { IComponent } from "adane-ecs"

export class DestructionComponent implements IComponent{
    destructed: boolean;
    needDestruct: boolean;
}