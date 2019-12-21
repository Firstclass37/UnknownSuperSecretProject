import { IComponent } from "adane-ecs"

export class CameraMoveComponent{
    constructor(
        public followPlayer: boolean, 
        public offsetX: number, 
        public offsetY: number){
    }
}