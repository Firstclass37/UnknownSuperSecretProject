import { IEngine, Entity } from "adane-ecs";
import { MapElementComponent } from "../Components/map-element-component";
import { DestructionComponent } from "../Components/destruction-component";
import { IndexedMap } from "../Implementations/indexed-map";
import { SettingsComponent } from "../Components/settings-componen";
import { HexagonGScoreStrategy } from "../Implementations/Hexagon/hexagon-g-score-strategy";
import { RhombusNieghborsSearchStrategy } from "../Implementations/Rhombus/rhombus-nieghbors-search-strategy";
import { RhombusFScoreStrategy } from "../Implementations/Rhombus/rhombus-fscore-strategy";
import { PathSearcher } from "../aStar/path-searcher";

export class MapExtentions{

    public static buildPath(start: number, end: number, engine: IEngine): number[] {
        let gameSettings = engine.entities.findOne(SettingsComponent).get(SettingsComponent);

        let indexedMap = MapExtentions.createIndexedMap(engine);
        let settings = {
            gScoreStrategy: new HexagonGScoreStrategy(),
            fScoreStrategy: new RhombusFScoreStrategy(indexedMap),
            neighborsSearchStrategy: new RhombusNieghborsSearchStrategy(indexedMap, false, false)
        };
        let pathSearcher = new PathSearcher();
        let path = pathSearcher.getPath(indexedMap.getElement(start), indexedMap.getElement(end), settings);
        return path.map(e => indexedMap.getIndex(e));
    }

    public static createIndexedMap(engine: IEngine): IndexedMap {
        let mapWidth = engine.entities.findOne(SettingsComponent).get(SettingsComponent).gameSettings.map.width;

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

    public static isBlocked(mapElement: Entity): boolean{
        return mapElement.get(DestructionComponent).needDestruct || mapElement.get(MapElementComponent).blocked;
    }
}