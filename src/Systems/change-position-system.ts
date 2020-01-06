import { ISystem, IEngine, Entity } from "adane-ecs"
import { ChangePositionComponent } from "../Components/change-position-component";
import { MapElementComponent } from "../Components/map-element-component";
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { RenderableComponent, SpriteObject } from "adane-ecs-graphics"
import { MapPositionComponent } from "../Components/map-position-component";

export class ChangePositionSystem implements ISystem{

    update(engine: IEngine): void {
        let entities = engine.entities.findMany(ChangePositionComponent);
        for(let i = 0; i< entities.length; i++){
            this.tryMove(engine, entities[i])
        }
    }

    private tryMove(engine: IEngine, entity: Entity): void {
        let positionChange = entity.get(ChangePositionComponent);
        if (positionChange.to && !positionChange.complete){
            let playerPos = entity.get(MapPositionComponent).mapElementNumber;
            let fromEntity = engine.entities.findMany(MapElementComponent).filter(e => e.get(MapElementComponent).num == playerPos)[0];
            let targetEntity = engine.entities.findMany(MapElementComponent).filter(e => e.get(MapElementComponent).num == positionChange.to)[0];
            if (this.move(entity, fromEntity,  targetEntity, positionChange.speed)){
                positionChange.complete = true;
            };
        }
    }

    private move(entity: Entity, from: Entity,  to: Entity, speed: number): boolean{
        let pos = entity.get(AbsolutePositionComponent);
        let fromPos = from.get(AbsolutePositionComponent);
        let targetPos = to.get(AbsolutePositionComponent);

        let vectorX = targetPos.x - fromPos.x;
        let vectorY = targetPos.y - fromPos.y;

        let stepX = vectorX * speed;
        let stepY = vectorY * speed;

        let targetPosX = targetPos.x + 15;
        let targetPosY = targetPos.y - 12;

        let nextPosX = pos.x + stepX;
        let nextPosY = pos.y + stepY;

        pos.x = Math.abs(stepX) < Math.abs(nextPosX - targetPosX) ?  nextPosX : targetPosX;
        pos.y = Math.abs(stepY) < Math.abs(nextPosY - targetPosY) ?  nextPosY : targetPosY;
        
        this.changeCoord(entity, pos.x, pos.y);

        return pos.x == targetPosX && pos.y == targetPosY;
    }

    private changeCoord(player: Entity, xPos: number, yPos: number){
        let renderable = player.get(RenderableComponent).renderable;
        renderable.set(SpriteObject, ".", (o) => { o.position = { x: xPos, y: yPos} });    
    }

}