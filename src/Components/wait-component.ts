import { IComponent } from "adane-ecs";

export class WaitComponent implements IComponent{
    constructor(
        public waiting: boolean = false,
        public start: number = 0,
        public duration: number = 0){}
}