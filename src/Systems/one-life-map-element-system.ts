import { ISystem, IEngine, Entity } from "adane-ecs"
import { MapElementComponent } from "../Components/map-element-component";
import { AssetsConsts } from "../assets-consts";
import { RenderableComponent, SpriteObject, Renderable } from "adane-ecs-graphics"
import { ChangePositionComponent } from "../Components/change-position-component";

export class OneLifeMapElementSystem implements ISystem {
    update(engine: IEngine): void {
        let changePosition = engine.entities.findOne(ChangePositionComponent).get(ChangePositionComponent);
        if (changePosition.from && changePosition.complete){
            let entity = this.findElement(changePosition.from, engine);

            this.changeSprite(entity.get(RenderableComponent).renderable);
        }    
    }

    private findElement(num: number, engine: IEngine): Entity{
        return engine.entities.findMany(MapElementComponent)
            .filter(e => e.get<MapElementComponent>(MapElementComponent.name).num == num)[0];
    }

    private changeSprite(renderable: Renderable): void{
        renderable.set(SpriteObject, ".", (p) => { p.texture = AssetsConsts.mapElementSprite2 })
    }
}
