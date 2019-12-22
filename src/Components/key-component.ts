import { IComponent } from "adane-ecs"

export class KeyComponent implements IComponent {
    constructor(){
        this.dropped = false;
    }
    dropped: boolean;
}