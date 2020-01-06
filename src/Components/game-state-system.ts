import { IComponent } from "adane-ecs";

export class GameStateComponent implements IComponent{
    constructor(
        public started: boolean = false, 
        public ended: boolean = false, 
        public paused: boolean = false){}
}