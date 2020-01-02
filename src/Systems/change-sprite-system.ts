import { ISystem, IEngine } from "adane-ecs"
import { RenderableComponent, SpriteObject } from "adane-ecs-graphics"
import { ChangeSpriteComponent } from "../Components/change-sprite-component"

export class ChangeSpriteSystem implements ISystem{

    update(engine: IEngine): void {

        let elements = engine.entities.findMany(ChangeSpriteComponent);
        for(let i = 0 ; i < elements.length; i++){
            let entity = elements[i];

            let asset = entity.get(ChangeSpriteComponent);
            if (asset.asset){
                let renderable = entity.get(RenderableComponent).renderable;
                renderable.set(SpriteObject, ".", (p) => { p.texture = asset.asset })
                asset.asset = null;
            }
            
        }
    }
}