import { ISystem, IEngine, Entity } from "adane-ecs";
import { EnemyComponent } from "../Components/enemy-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { EnemyTrajectoryComponent } from "../Components/enemy-trajectory-component";
import { ChangePositionComponent } from "../Components/change-position-component";
import { WaitComponent } from "../Components/wait-component";


export class EnemyWaitSystem implements ISystem{
    update(engine: IEngine): void {
        let enemies = engine.entities.findMany(EnemyComponent);
        for(let i = 0; i < enemies.length; i++){
            let currEnemy = enemies[i];

            let waitComp = currEnemy.get(WaitComponent);
            if (!waitComp.waiting && this.canWait(currEnemy)){
                waitComp.waiting = true;
                waitComp.start = engine.time.total;
                waitComp.duration = 300;
            }
            if (waitComp.waiting && (waitComp.start + waitComp.duration) < engine.time.total){
                waitComp.waiting = false;
            }
        }
    }

    private canWait(enemy: Entity): boolean{
        
        let path = enemy.get(EnemyTrajectoryComponent).path;
        let changePos = enemy.get(ChangePositionComponent);
        let position = changePos.to ? changePos.to : enemy.get(MapPositionComponent).mapElementNumber;

        return path && changePos.complete && (path.indexOf(position) === 0 || path.indexOf(position) === path.length - 1);
    }

}