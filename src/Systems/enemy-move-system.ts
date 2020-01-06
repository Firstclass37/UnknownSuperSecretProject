import { ISystem, IEngine, Entity } from "adane-ecs";
import { EnemyComponent } from "../Components/enemy-component";
import { EnemyTrajectoryComponent } from "../Components/enemy-trajectory-component";

export class EnemyMoveSystem implements ISystem{
    update(engine: IEngine): void {
        let enemies = engine.entities.findMany(EnemyComponent);
        for(let i = 0; i < enemies.length; i++){
            let currEnemy = enemies[i];
            let trajectory = this.getTraectory(currEnemy);
        }
    }

    private getTraectory(enemy: Entity): EnemyTrajectoryComponent{
        let trajectory = enemy.get(EnemyTrajectoryComponent);
        if (trajectory){
            return trajectory;
        }
        return this.createTrajectory();
    }

    private createTrajectory(): EnemyTrajectoryComponent{
        return null;
    }

}