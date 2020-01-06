import { ISystem, IEngine } from "adane-ecs";
import { EnemyComponent } from "../Components/enemy-component";

export class EnemyMoveSystem implements ISystem{
    update(engine: IEngine): void {
        let enemies = engine.entities.findMany(EnemyComponent);
    }

}