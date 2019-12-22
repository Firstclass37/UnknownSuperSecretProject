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
        if (!changeCoordinates.compeleted){
            if (this.move(entity, changeCoordinates)){
                this.refresh(changeCoordinates);
            }
        }
    }

    private move(entity: Entity, changeCoordinates: ChangeCoordinatesComponent): boolean{
        let position = entity.get(AbsolutePositionComponent);

        let offsetX = changeCoordinates.offsetX;
        let offsetY = changeCoordinates.offsetY;

        let stepVectorX = offsetX > 0 ? changeCoordinates.speed : -changeCoordinates.speed;
        let stepVectorY = offsetY > 0 ? changeCoordinates.speed : -changeCoordinates.speed;

        let stepX = Math.abs(offsetX) > changeCoordinates.speed ? stepVectorX : offsetX;
        let stepY = Math.abs(offsetY) > changeCoordinates.speed ? stepVectorY : offsetY;

        if (stepX !==0 || stepY !==0){
            position.x += stepX;
            position.y += stepY;
            this.changeCoord(entity, position.x, position.y);
            changeCoordinates.offsetX -= stepX;
            changeCoordinates.offsetY -= stepY;
        }
        return changeCoordinates.offsetX === 0 && changeCoordinates.offsetY === 0;
    }

    private refresh(component: ChangeCoordinatesComponent): void{
        component.compeleted = true;
        component.offsetX = undefined;
        component.offsetY = undefined;
    }

    private changeCoord(player: Entity, xPos: number, yPos: number){
        let renderable = player.get(RenderableComponent).renderable;
        renderable.set(SpriteObject, ".", (o) => { o.position = { x: xPos, y: yPos} });    
    }

}