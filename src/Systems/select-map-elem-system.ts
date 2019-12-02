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
            let curEnity = entities[i];
            if (curEnity.get(InputComponent).hit){
                let selectComp = curEnity.get(SelectComponent);
                if (selectComp.once){
                    selectComp.double = true;
                }
                if (!selectComp.once){
                    selectComp.once;
                    curEnity.get(ChangeSpriteComponent).asset = AssetsConsts.mapElementSelectedSprite;
                }
            }
        }

        entities.forEach(e => {
            let input = e.get(InputComponent);
            if (input.hit){
                console.log(`hit!!!!! ${e.identity}`);
            }
        });
    }

}