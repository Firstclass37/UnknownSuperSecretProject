import { ISystem, IEngine, Entity } from "adane-ecs"
import { InputComponent, PointerDownInputTrigger } from "adane-ecs-input";
import { MapElementComponent } from "../Components/map-element-component";
import { SelectComponent} from "..//Components/select-component";
import { ChangeSpriteComponent } from "../Components/change-sprite-component";
import { AssetBatchComponent } from "adane-ecs-graphics";
import { AssetsConsts } from "../assets-consts";

export class SelectMapElementSystem implements ISystem{

    update(engine: IEngine): void {

        let entities = engine.entities.findMany(InputComponent, MapElementComponent);

        for(let i = 0; i < entities.length; i++){
            let curEntity = entities[i];
            if (curEntity.get(InputComponent).hit){
                let selectComp = curEntity.get(SelectComponent);

                selectComp.double = selectComp.once;
                if (!selectComp.once){
                    selectComp.once = true;;
                    curEntity.get(ChangeSpriteComponent).asset = AssetsConsts.mapElementSelectedSprite;
                }

                this.clearOther(entities, curEntity);
                break;
            }
        }

        this.loggingHits(entities);
    }

    private clearOther(entities: Entity[], exclude: Entity): void{
        for(let i = 0; i < entities.length; i++){
            let curEntity = entities[i];
            if (curEntity != exclude){
                let selectComp = curEntity.get(SelectComponent);
                selectComp.once = false;
                selectComp.double = false;
                curEntity.get(ChangeSpriteComponent).asset = AssetsConsts.mapElementSprite2;
            }
        }
    }

    private loggingHits(entities: Entity[]): void{
        entities
            .forEach(e => {
                let input = e.get(InputComponent);
                if (input.hit){
                    console.log(`hit!!!!! ${e.identity}`);
                }
            });
    }

}