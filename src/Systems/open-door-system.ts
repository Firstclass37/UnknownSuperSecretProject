import { ISystem, IEngine, Entity } from "adane-ecs";
import { DoorComponent } from "../Components/door-component";
import { KeyComponent } from "../Components/key-component";
import { ChangeSpriteComponent } from "../Components/change-sprite-component";
import { AssetsConsts } from "../assets-consts";
import { MapElementComponent } from "../Components/map-element-component";
import { MapPositionComponent } from "../Components/map-position-component";

export class OpenDoorSystem implements ISystem{
    update(engine: IEngine): void {
        let doorEntity = engine.entities.findOne(DoorComponent);
        let doorComp = doorEntity.get(DoorComponent);
        if (!doorComp.opened && this.canOpen(engine)){
            this.open(doorEntity, engine);
        }
    }

    private open(door: Entity, engine: IEngine): void{
        let position = door.get(MapPositionComponent).mapElementNumber;
        let mapElement = engine.entities
            .findMany(MapElementComponent)
            .filter(e => e.get(MapElementComponent).num === position)[0]
            .get(MapElementComponent);

        mapElement.blocked = false;
        door.get(DoorComponent).opened = true;
        door.get(ChangeSpriteComponent).asset = AssetsConsts.doorOpened;
    }

    private canOpen(engine: IEngine): boolean{
        return engine.entities.findMany(KeyComponent).map(e => e.get(KeyComponent).dropped).filter(d => !d).length === 0;
    }
}