import { IComponent } from "adane-ecs";

export class GameEndComponent implements IComponent{
    constructor(public message: string, public successfully: boolean){}
}