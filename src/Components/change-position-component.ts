import { IComponent } from "adane-ecs"

export class ChangePositionComponent implements IComponent {
    constructor(){
        this.complete = true;
    }
    to: number;
    complete: boolean;
}