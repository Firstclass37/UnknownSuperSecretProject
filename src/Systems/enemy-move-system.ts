import { ISystem, IEngine, Entity } from "adane-ecs";
import { EnemyComponent } from "../Components/enemy-component";
import { EnemyTrajectoryComponent } from "../Components/enemy-trajectory-component";
import { ChangePositionComponent } from "../Components/change-position-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { SettingsComponent } from "../Components/settings-componen";
import { RenderableComponent } from "adane-ecs-graphics";

export class EnemyMoveSystem implements ISystem{
    update(engine: IEngine): void {
        let enemies = engine.entities.findMany(EnemyComponent);
        for(let i = 0; i < enemies.length; i++){
            if (!enemies[i].has(RenderableComponent.name)){
                return;
            }

            this.initTraectory(engine, enemies[i]);
            this.move(engine, enemies[i]);
        }
    }

    private move(engine: IEngine, enemy: Entity): void{
        let changeCoord = enemy.get(ChangePositionComponent);
        let currPos = enemy.get(MapPositionComponent);
        if (changeCoord.complete){
            let next = this.chooseNext(enemy, changeCoord);
            if (changeCoord.to){
                currPos.mapElementNumber = changeCoord.to;
            }

            changeCoord.complete = false;
            changeCoord.from = currPos.mapElementNumber;
            changeCoord.to = next;
        }
    }

    private chooseNext(enemy: Entity, changePos: ChangePositionComponent): number{
        let trajectory = enemy.get(EnemyTrajectoryComponent).path;
        if (!changePos.to){
            return trajectory[trajectory.indexOf(changePos.from) + 1];
        }

        let indexFrom = trajectory.indexOf(changePos.from);
        let indexTo = trajectory.indexOf(changePos.to);

        let step = indexTo - indexFrom;
        let nextPos = indexTo + step;
        if (nextPos < 0 || nextPos > trajectory.length - 1){
            nextPos = indexTo - step;
        }
        return trajectory[nextPos];
    }

    private initTraectory(engine: IEngine, enemy: Entity): void{
        let trajectory = enemy.get(EnemyTrajectoryComponent);
        if (!trajectory.path){
            let mapSettings = engine.entities.findOne(SettingsComponent).get(SettingsComponent).gameSettings.map;
            let position = enemy.get(MapPositionComponent).mapElementNumber;

            trajectory.startPosition =  position;
            trajectory.path = [ position - 1 + mapSettings.width - 1, trajectory.startPosition, position - 1 - mapSettings.width + 1 ];    
        }
    }
}