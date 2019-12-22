import { IComponent } from "adane-ecs"

export class ChangeCoordinatesComponent implements IComponent {
    constructor(){
        this.compeleted = true;
        this.speed = 0.1;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    offsetX: number;
    offsetY: number;
    compeleted: boolean;
    speed: number;
}