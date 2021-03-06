import { ISystem, IEngine, Entity } from "adane-ecs"
import { RenderableComponent, Renderable } from "adane-ecs-graphics"
import { AssetsConsts } from "../assets-consts";
import { SettingsComponent } from "../Components/settings-componen";
import { MapElementComponent } from "../Components/map-element-component";
import { InputComponent, PointerDownInputTrigger } from "adane-ecs-input";
import { AbsolutePositionComponent } from "../Components/absolute-position-component";
import { CameraComponent } from "../Components/camera-component";

export class MapRenderSystem implements ISystem{

    update(engine: IEngine): void {

        let elements = engine.entities.findMany(MapElementComponent).sort(e => e.get(MapElementComponent).num);
        if (!elements[0].get(RenderableComponent)){
            this.init(engine, elements);
        }     
    }
    
    private init(engine: IEngine, entities: Entity[]): void{
        let camera = engine.entities.findOne(CameraComponent).get(CameraComponent);
        let settings = engine.entities.findOne(SettingsComponent).get(SettingsComponent);
        let gameSettings = settings.gameSettings;

        let verticalPadding = camera.y + gameSettings.size.spriteWidth;
        let horizontalPadding = camera.x;
        let additionalPadding = gameSettings.size.spriteWidth / 2;
        let even = settings.gameSettings.map.even;
        let width = settings.gameSettings.map.width;

        for (let i = 0; i < entities.length; i++){
            
            let tempWidth = 2 * width - 1
            let bigRowCount = Math.floor((i) / tempWidth);

            let pos = (i + 1) - bigRowCount * tempWidth;

            let colomn = (pos <= width ? pos : pos - width);
            let row =  2 * bigRowCount + (pos <= width ? 0 : 1) + 1;
         

            let x = horizontalPadding + (colomn - 1) * (gameSettings.size.spriteWidth );
            let y = verticalPadding + (row - 1) * (gameSettings.size.spriteHieght / 2 );
            if (even == (row % 2 == 0)){
                x += additionalPadding;
            }

            this.apply(entities[i], x, y);
        }
    }
    
    private apply(entity: Entity, x: number, y: number){
            entity.add(this.createRenderable(AssetsConsts.mapElementSprite2, `mapElement${x},${y}`, x, y));
            entity.add(new AbsolutePositionComponent(x, y));
            entity.add(new InputComponent(new PointerDownInputTrigger()));
    }

    private createRenderable(asset: string, name: string, xPos: number, yPos: number): RenderableComponent{
        return new RenderableComponent(Renderable.define((factory) => factory.sprite( { name: name, texture: asset, position: {x: xPos, y: yPos}} )));
    }
}