import { ISystem, IEngine, Entity } from "adane-ecs";
import { EnemyComponent } from "../Components/enemy-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { EnemyTrajectoryComponent } from "../Components/enemy-trajectory-component";
import { MapElementExtentions } from "../Helpers/map-element-extentions";
import { ChangeSpriteComponent } from "../Components/change-sprite-component";
import { AssetsConsts } from "../assets-consts";
import { EnemyVisionComponent } from "../Components/enemy-vision-component";
import { RhombusNieghborsSearchStrategy } from "../Implementations/Rhombus/rhombus-nieghbors-search-strategy";
import { MapExtentions } from "../Helpers/map-extentions";
import { RenderableComponent } from "adane-ecs-graphics";
import { ChangePositionComponent } from "../Components/change-position-component";

export class EnemyVisionSystem implements ISystem{
    update(engine: IEngine): void {
        let enemies = engine.entities.findMany(EnemyComponent);
        for(let i = 0; i < enemies.length; i++){
            if (!enemies[i].has(RenderableComponent.name)){
                return;
            }

            this.setVision(enemies[i], engine);
        }
    }

    private setVision(enemy: Entity, engine: IEngine): void{
        let position = enemy.get(MapPositionComponent).mapElementNumber;
        let path = enemy.get(EnemyTrajectoryComponent).path;
        if (!path){
            return;
        }

        let vision = enemy.get(EnemyVisionComponent);
        let inPosition = path.indexOf(position) === 0 || path.indexOf(position) === path.length - 1;
        let inMovement = enemy.get(ChangePositionComponent).complete === false;
        if (inPosition && !vision.vision && !inMovement){
            this.initVision(enemy.get(MapPositionComponent).mapElementNumber, vision, engine);
        }
        else if (vision.vision){
            this.clearVision(vision, engine);
        }
    }

    private initVision(postion: number, vision: EnemyVisionComponent, engine: IEngine): void{
        let neighbors = new RhombusNieghborsSearchStrategy(MapExtentions.createIndexedMap(engine), true, false)
            .getNieghbors(postion).filter(n => !n.isBlocked).map(n => n.num);

        this.changeMapSprite(neighbors, engine, AssetsConsts.mapElementEnemyVision);
        vision.vision = neighbors;
    }

    private clearVision(visionComponent: EnemyVisionComponent, engine: IEngine): void{
        this.changeMapSprite(visionComponent.vision, engine, AssetsConsts.mapElementSprite2);
        visionComponent.vision = null;
        
    }

    private changeMapSprite(numbers: number[], engine: IEngine, asset: string): void{
        numbers.forEach(e => {
            let mapElem = MapElementExtentions.find(engine, e);
            mapElem.get(ChangeSpriteComponent).asset = asset;
            mapElem.get(ChangeSpriteComponent).changed = false;
        });
    }
}