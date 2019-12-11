import { ISystem, IEngine, Entity } from "adane-ecs"
import { PlayerComponent } from "../Components/player-component"
import { RenderableComponent, Renderable } from "adane-ecs-graphics"
import { MapPositionComponent } from "../Components/map-position-component";
import { MapElementComponent } from "../Components/map-element-component";
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { AssetsConsts } from "../assets-consts";

export class PlayerRenderSystem implements ISystem{


    update(engine: IEngine): void {
        let player = engine.entities.findOne(PlayerComponent);
        if (!player.has(RenderableComponent.name) && engine.time.total > 200){
            this.init(engine, player);
        }else{
            this.checkUpdate(player);
        }
    }

    private init(egine: IEngine, player: Entity): void{
        let position = player.get(MapPositionComponent).mapElementNumber;
        let absoluteMapPosition = egine.entities
            .findMany(MapElementComponent)
            .filter(e => e.get(MapElementComponent).num == position)[0]
            .get(AbsolutePositionComponent);

        if (absoluteMapPosition){
            let x = absoluteMapPosition.x + 15;
            let y = absoluteMapPosition.y - 12;
            
            player.add(this.createRenderable(AssetsConsts.playerSprite, "player", x, y));
            player.add(new AbsolutePositionComponent(x, y));
        }
    }

    private checkUpdate(player: Entity): void{
        //let position = player.get(AbsolutePositionComponent);

        //player.remove(RenderableComponent.name);
        //player.add(this.createRenderable(AssetsConsts.playerSprite, `player${position.x}${position.y}`, position.x, position.y));
    }

    private createRenderable(asset: string, name: string, xPos: number, yPos: number): RenderableComponent{
        return new RenderableComponent(Renderable.define((factory) => factory.sprite( { name: name, texture: asset, position: {x: xPos, y: yPos}} )));
    }
}