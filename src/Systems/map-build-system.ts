import { ISystem, IEngine, Entity } from "adane-ecs"
import { RenderableComponent, Renderable, SpriteObject } from "adane-ecs-graphics"
import { Guid } from "adane-system";


export class MapBuildSystem implements ISystem {

    update(engine: IEngine): void {
        let width = 800;
        let heigth = 640;
        let eachRow = 6;
        let rowCount = 6;
        let spriteWidth = 30;
        let spriteHeigth = 30;
        let paddingBetween = 1;

        let horizontalPadding = (width - eachRow * spriteWidth - (eachRow - 1) * paddingBetween) /2;
        let verticalPadding = (heigth - rowCount * spriteHeigth - (rowCount - 1) * paddingBetween) /2;

        for (let row = 1; row <= rowCount; row++){
            for(let column = 1; column <= eachRow; column++){
                let x = horizontalPadding + (column - 1) * (spriteWidth + paddingBetween);
                let y = verticalPadding + (row - 1) * (spriteHeigth + paddingBetween);

                let renderable = this.createRenderable(`mapElement${column},${row}`, x, y);
                let entity = new Entity(Guid.newGuid(), renderable);
                engine.entities.add(entity);
            }
        }

        engine.removeSystem(this);
    }

    private createRenderable(name: string, xPos: number, yPos: number): RenderableComponent{
        let component = new RenderableComponent(Renderable.define((factory) => factory.sprite( { texture: "./assets/square.png", name: name} )));
        component.renderable.set(SpriteObject, name,  (x) => x.position = {x: xPos, y: yPos});
        return component;
    }

}