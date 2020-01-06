import { IComponent } from "adane-ecs";

export class TemporaryComponent implements IComponent{
    constructor(public start: number, public duration: number){}
}