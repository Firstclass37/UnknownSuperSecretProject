import { IComponent } from "adane-ecs"

export class TurnCounterComponent implements IComponent{
    //user's turns count
    value: number;
}