import { IEngine, Entity } from "adane-ecs";
import { MapElementComponent } from "../Components/map-element-component";

export class MapElementExtentions{
    public static find(engine: IEngine, number: number): Entity{
        return engine.entities
        .findMany(MapElementComponent)
        .filter(e => e.get(MapElementComponent).num == number)[0]
    }
}