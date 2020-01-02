import { IComponent } from "adane-ecs"

export class DoorComponent implements IComponent{
    constructor(public opened: boolean = false){}
}