import { IComponent } from "adane-ecs"

export class MapPositionComponent implements IComponent{
    constructor(public mapElementNumber: number) {};
}