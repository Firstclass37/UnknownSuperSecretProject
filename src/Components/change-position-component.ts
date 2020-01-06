import { IComponent } from "adane-ecs"

export class ChangePositionComponent implements IComponent {
    constructor(){
        this.complete = true;
    }
    from: number;
    to: number;
    complete: boolean;
    speed: number = 0.1;
}