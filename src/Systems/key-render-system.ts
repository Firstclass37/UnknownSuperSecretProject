import { ISystem, IEngine, Entity } from "adane-ecs"
import { RenderableComponent, Renderable } from "adane-ecs-graphics"
import { MapPositionComponent } from "../Components/map-position-component";
import { MapElementComponent } from "../Components/map-element-component";
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { AssetsConsts } from "../assets-consts";
import { KeyComponent } from "../Components/key-component";

export class KeyRenderSystem implements ISystem{


    update(engine: IEngine): void {
        if (engine.time.total < 200){
            return;
        }

        let keys = engine.entities.findMany(KeyComponent);
        for(let i = 0; i < keys.length; i++){
            if (!keys[i].has(RenderableComponent.name)){
                this.init(engine, keys[i])
            }
        }
        
    }

    private init(egine: IEngine, key: Entity): void{
        let position = key.get(MapPositionComponent).mapElementNumber;
        let absoluteMapPosition = egine.entities
            .findMany(MapElementComponent)
            .filter(e => e.get(MapElementComponent).num == position)[0]
            .get(AbsolutePositionComponent);

        if (absoluteMapPosition){
            let x = absoluteMapPosition.x + 15;
            let y = absoluteMapPosition.y - 12;
            
            key.add(this.createRenderable(AssetsConsts.key, `key${x}-${y}`, x, y));
            key.add(new AbsolutePositionComponent(x, y));
        }
    }

    private createRenderable(asset: string, name: string, xPos: number, yPos: number): RenderableComponent{
        return new RenderableComponent(Renderable.define((factory) => factory.sprite( { name: name, texture: asset, position: {x: xPos, y: yPos}} )));
    }
}