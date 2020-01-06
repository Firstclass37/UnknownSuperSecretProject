import { RenderableComponent, Renderable } from "adane-ecs-graphics";

export class RenderableExtentions{
    public static createRenderable(asset: string, name: string, xPos: number, yPos: number): RenderableComponent{
        return new RenderableComponent(Renderable.define((factory) => factory.sprite( { name: name, texture: asset, position: {x: xPos, y: yPos}} )));
    }

    
}