import { IComponent } from "adane-ecs"

export class MapElementComponent implements IComponent{
    constructor(public num: number){}
}