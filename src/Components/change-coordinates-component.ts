import { IComponent } from "adane-ecs"

export class ChangeCoordinatesComponent implements IComponent {
    constructor(){
        this.compeleted = false;
        this.speed = 0.1;
    }
    xFrom: number;
    yFrom: number;

    xTo: number;
    yTo: number;

    compeleted: boolean;
    speed: number;
}