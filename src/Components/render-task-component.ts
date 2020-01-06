import { IComponent } from "adane-ecs";

export class RenderTaskComponent implements IComponent{
    constructor(
        public sprite: string,
        public x: number = 0,
        public y: number = 0){}
}