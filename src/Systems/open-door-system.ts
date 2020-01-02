import { ISystem, IEngine, Entity } from "adane-ecs";
import { DoorComponent } from "../Components/door-component";
import { KeyComponent } from "../Components/key-component";
import { ChangeSpriteComponent } from "../Components/change-sprite-component";
import { AssetsConsts } from "../assets-consts";

export class OpenDoorSystem implements ISystem{
    update(engine: IEngine): void {
        let doorEntity = engine.entities.findOne(DoorComponent);
        let doorComp = doorEntity.get(DoorComponent);
        if (!doorComp.opened && this.canOpen(engine)){
            this.open(doorEntity);
        }
    }

    private open(door: Entity): void{
        door.get(DoorComponent).opened = true;
        door.get(ChangeSpriteComponent).asset = AssetsConsts.doorOpened;
    }

    private canOpen(engine: IEngine): boolean{
        return engine.entities.findMany(KeyComponent).map(e => e.get(KeyComponent).dropped).filter(d => !d).length === 0;
    }
}