import { IComponent } from "adane-ecs"

export class ChangeSpriteComponent implements IComponent {
    constructor(){
        this.changed = false;
    }
    asset: string;
    changed: boolean;
}