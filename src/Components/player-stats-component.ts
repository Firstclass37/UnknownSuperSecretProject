import { IComponent } from "adane-ecs"

export class PlayerStatsComponent implements IComponent{
    health: number;
    resource: number;
}