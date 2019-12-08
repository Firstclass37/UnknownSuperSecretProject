import { ISystem, IEngine, Entity } from "adane-ecs"
import { PlayerComponent } from "../Components/player-component";
import { ChangePositionComponent } from "../Components/change-position-component";
import { MapElementComponent } from "../Components/map-element-component";
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { RenderableComponent, SpriteObject } from "adane-ecs-graphics"
import { Point } from "pixi.js";
import { MapPositionComponent } from "../Components/map-position-component";

export class ChangePositionSystem implements ISystem{

    update(engine: IEngine): void {
        let player = engine.entities.findOne(PlayerComponent, ChangePositionComponent);
        let positionChange = player.get(ChangePositionComponent);
        if (positionChange.to && !positionChange.complete){
            let playerPos = player.get(MapPositionComponent).mapElementNumber;
            let fromEntity = engine.entities.findMany(MapElementComponent).filter(e => e.get(MapElementComponent).num == playerPos)[0];
            let targetEntity = engine.entities.findMany(MapElementComponent).filter(e => e.get(MapElementComponent).num == positionChange.to)[0];
            if (this.move(player, fromEntity,  targetEntity)){
                positionChange.complete = true;
            };
        }
        
    }

    private move(player: Entity, from: Entity,  to: Entity): boolean{
        let playerPos = player.get(AbsolutePositionComponent);
        let fromPos = from.get(AbsolutePositionComponent);
        let targetPos = to.get(AbsolutePositionComponent);

        let vectorX = targetPos.x - fromPos.x;
        let vectorY = targetPos.y - fromPos.y;

        let stepX = vectorX;
        let stepY = vectorY;
        let nextX = playerPos.x + stepX;
        let nextY = playerPos.y + stepY;

        playerPos.x = nextX > targetPos.x ? targetPos.x : nextX;
        playerPos.y = nextY > targetPos.y ? targetPos.y : nextY;
        
        this.changeCoord(player, playerPos.x, playerPos.y);

        return playerPos.x == targetPos.x && playerPos.y == targetPos.y;
    }

    private changeCoord(player: Entity, xPos: number, yPos: number){
        let renderable = player.get(RenderableComponent).renderable;
        renderable.set(SpriteObject, ".", (o) => { o.position = new Point(xPos, yPos) });    
        //renderable.set(SpriteObject, ".", (o) => { o.position.x = xPos, o.position.y = yPos });        
    }

}