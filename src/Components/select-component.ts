import { IComponent } from "adane-ecs"

export class SelectComponent implements IComponent{
    once: boolean = false;
    double: boolean = false;
}