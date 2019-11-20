import { IComponent } from "adane-ecs"

export class BonusActivityComponent implements IComponent{
    activated: boolean = false;
    activationTime: number;
}