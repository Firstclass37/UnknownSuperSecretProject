import { ISystem, IEngine, Entity } from "adane-ecs"
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { RenderableComponent, SpriteObject } from "adane-ecs-graphics"
import { ChangeCoordinatesComponent } from "../Components/change-coordinates-component";

export class ChangeCoordinatesSystem implements ISystem{

    update(engine: IEngine): void {
        let entities = engine.entities.findMany(ChangeCoordinatesComponent);
        for(let i = 0; i < entities.length; i++){
            this.changeCoordinates(entities[i]);
        }
    }

    private changeCoordinates(entity: Entity): void{
        let changeCoordinates = entity.get(ChangeCoordinatesComponent);
        if (!changeCoordinates.compeleted && changeCoordinates.xFrom){
            if (this.move(entity, changeCoordinates)){
                this.refresh(changeCoordinates);
            }
        }
    }

    private move(entity: Entity, changeCoordinates: ChangeCoordinatesComponent): boolean{
        let position = entity.get(AbsolutePositionComponent);

        let vectorX = changeCoordinates.xTo - changeCoordinates.xFrom;
        let vectorY = changeCoordinates.yTo - changeCoordinates.yFrom;

        let stepX = vectorX * changeCoordinates.speed;
        let stepY = vectorY * changeCoordinates.speed;

        let targetPlayerPosX = changeCoordinates.xTo;
        let targetPlayerPosY = changeCoordinates.yTo;

        let nextPosX = position.x + stepX;
        let nextPosY = position.y + stepY;

        position.x = Math.abs(stepX) < Math.abs(nextPosX - targetPlayerPosX) ?  nextPosX : targetPlayerPosX;
        position.y = Math.abs(stepY) < Math.abs(nextPosY - targetPlayerPosY) ?  nextPosY : targetPlayerPosY;
        
        this.changeCoord(entity, position.x, position.y);

        return position.x == targetPlayerPosX && position.y == targetPlayerPosY;
    }

    private refresh(component: ChangeCoordinatesComponent): void{
        component.compeleted = true;
        component.xFrom = undefined;
        component.yFrom = undefined;
        component.xTo = undefined;
        component.yTo = undefined;
    }

    private changeCoord(player: Entity, xPos: number, yPos: number){
        let renderable = player.get(RenderableComponent).renderable;
        renderable.set(SpriteObject, ".", (o) => { o.position = { x: xPos, y: yPos} });    
    }

}