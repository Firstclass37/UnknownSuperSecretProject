import { ISystem, IEngine, Entity } from "adane-ecs";
import { EnemyComponent } from "../Components/enemy-component";
import { EnemyTrajectoryComponent } from "../Components/enemy-trajectory-component";
import { ChangePositionComponent } from "../Components/change-position-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { RenderableComponent } from "adane-ecs-graphics";
import { MapElementExtentions } from "../Helpers/map-element-extentions";
import { MapExtentions } from "../Helpers/map-extentions";

export class EnemyMoveSystem implements ISystem{
    update(engine: IEngine): void {
        let enemies = engine.entities.findMany(EnemyComponent);
        for(let i = 0; i < enemies.length; i++){
            if (!enemies[i].has(RenderableComponent.name)){
                return;
            }

            this.initTraectory(engine, enemies[i]);
            this.move(enemies[i]);
        }
    }

    private move(enemy: Entity): void{
        let changeCoord = enemy.get(ChangePositionComponent);
        let currPos = enemy.get(MapPositionComponent);
        if (changeCoord.complete){
            if (changeCoord.to){
                currPos.mapElementNumber = changeCoord.to;
            }

            let next = this.chooseNext(enemy, currPos.mapElementNumber);

            changeCoord.complete = false;
            changeCoord.from = currPos.mapElementNumber;
            changeCoord.to = next;
            changeCoord.speed = 0.03;
        }
    }

    private chooseNext(enemy: Entity, position: number): number{
        let trajectory = enemy.get(EnemyTrajectoryComponent);
        if (trajectory.path.length === 1){
            return position;
        }

        let index = trajectory.path.indexOf(position);
        if (index == trajectory.path.length - 1){
            trajectory.path = trajectory.path.reverse();
            return this.chooseNext(enemy, position);
        }
        return trajectory.path[index + 1];
    }

    private initTraectory(engine: IEngine, enemy: Entity): void{
        let trajectory = enemy.get(EnemyTrajectoryComponent);
        if (!trajectory.path){
            let position = enemy.get(MapPositionComponent).mapElementNumber;

            let k = (Math.random() * 10) % 2 == 0 ? 1 : -1;
            let step = Math.floor(Math.random() * 10) + 1;

            let targetPostion = position + k * step;
            let targetMapElem = MapElementExtentions.find(engine, targetPostion);
            if (!targetMapElem || MapExtentions.isBlocked(targetMapElem)){
                this.initTraectory(engine, enemy);
            }

            let path = MapExtentions.buildPath(position, targetPostion, engine);
            if (path.length == 0){
                this.initTraectory(engine, enemy);
            }

            trajectory.startPosition = position;
            trajectory.path = path;    
        }
    }
}