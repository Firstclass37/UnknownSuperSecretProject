import { IComponent } from "adane-ecs"

export class EffectComponent implements IComponent{
    //concrete effect what change some player params for this value
    value: number;
}