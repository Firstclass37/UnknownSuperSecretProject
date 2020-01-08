import { IComponent } from "adane-ecs";

export class DamageComponent implements IComponent{
    constructor(public from: string, value: number) {}
}