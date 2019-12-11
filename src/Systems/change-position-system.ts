import { ISystem, IEngine, Entity } from "adane-ecs"
import { PlayerComponent } from "../Components/player-component";
import { ChangePositionComponent } from "../Components/change-position-component";
import { MapElementComponent } from "../Components/map-element-component";
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { RenderableComponent, SpriteObject } from "adane-ecs-graphics"
import { MapPositionComponent } from "../Components/map-position-component";
import { AssetsConsts } from "../assets-consts";

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

        let stepX = vectorX * 0.1;
        let stepY = vectorY * 0.1;

        let targetPlayerPosX = targetPos.x + 15;
        let targetPlayerPosY = targetPos.y - 12

        let nextPosX = playerPos.x + stepX;
        let nextPosY = playerPos.y + stepY;

        playerPos.x = Math.abs(stepX) < Math.abs(nextPosX - targetPlayerPosX) ?  nextPosX : targetPlayerPosX;
        playerPos.y = Math.abs(stepY) < Math.abs(nextPosY - targetPlayerPosY) ?  nextPosY : targetPlayerPosY;
        
        this.changeCoord(player, playerPos.x, playerPos.y);

        return playerPos.x == targetPlayerPosX && playerPos.y == targetPlayerPosY;
    }

    private getLength(vectorX: number, vectorY: number): number{
        return Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2))
    }

    private changeCoord(player: Entity, xPos: number, yPos: number){
        let renderable = player.get(RenderableComponent).renderable;
        renderable.set(SpriteObject, ".", (o) => { o.position = { x: xPos, y: yPos} });    
    }

}