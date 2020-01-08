import { IEngine, Entity } from "adane-ecs";
import { MapElementComponent } from "../Components/map-element-component";
import { DestructionComponent } from "../Components/destruction-component";
import { IndexedMap } from "../Implementations/indexed-map";

export class MapExtentions{
    public static createIndexedMap(engine: IEngine, mapWidth: number): IndexedMap {
        let mapElements = engine.entities.findMany(MapElementComponent);
        let map: any = [];
        for(let i = 0; i < mapElements.length; i++){
            let mapElement = mapElements[i].get<MapElementComponent>(MapElementComponent.name);
            map[mapElement.num] = {
                speed: 1,
                isBlocked: this.isBlocked(mapElements[i]),
                num: mapElement.num
            };
        }
        return new IndexedMap(map, mapWidth);
    }

    private static isBlocked(mapElement: Entity): boolean{
        return mapElement.get(DestructionComponent).needDestruct || mapElement.get(MapElementComponent).blocked;
    }
}