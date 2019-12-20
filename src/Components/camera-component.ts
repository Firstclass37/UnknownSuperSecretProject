import { IComponent } from "adane-ecs"

export class CameraComponent implements IComponent{
    constructor(
        public width: number,
        public height: number, 
        public x: number, 
        public y: number){}
}