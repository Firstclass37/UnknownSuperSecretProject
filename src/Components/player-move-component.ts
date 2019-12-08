import { IComponent } from "adane-ecs"

export class PlayerMoveComponent implements IComponent{
    constructor(){
        this.new = false;
    }
    public path: number[];
    public new: boolean;
}