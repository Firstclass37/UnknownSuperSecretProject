import { IComponent } from "adane-ecs"

export class PlayerComponent implements IComponent{
    constructor(public alive: boolean = true){}
}