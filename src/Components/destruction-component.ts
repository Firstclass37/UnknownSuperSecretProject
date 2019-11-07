import { IComponent } from "adane-ecs"

export class DestructionComponent implements IComponent{
    //some info about destruction 
    destructed: boolean;
    needDestruct: boolean;
}