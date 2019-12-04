import { ISystem, IEngine } from "adane-ecs"
import { MapElementComponent } from "../Components/map-element-component";
import { PlayerMoveComponent } from "../Components/player-move-component";
import { PlayerComponent } from "../Components/player-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { SquareGScoreStrategy } from "../Implementations/Square/square-g-score-strategy";
import { FScoreStrategy } from "../Implementations/f-score-strategy";
import { IndexedMap } from "../Implementations/indexed-map";
import { PathSearcher } from "../aStar/path-searcher";
import { DestructionComponent } from "../Components/destruction-component";
import { RhombusNieghborsSearchStrategy } from "../Implementations/Rhombus/rhombus-nieghbors-search-strategy";
import { SelectComponent } from "../Components/select-component";
import { SettingsComponent } from "../Components/settings-componen";

export class MovementSystem implements ISystem {
    update(engine: IEngine): void {
        let interacted = engine.entities.findMany(MapElementComponent, SelectComponent).filter(e => e.get(SelectComponent).once);
        if (interacted && interacted.length > 0){
            let entity = interacted[0];
            
            let targetPosition = entity.get<MapElementComponent>(MapElementComponent).num;
            let currentPlayerPosition = engine.entities.findOne(PlayerComponent).get<MapPositionComponent>(MapPositionComponent).mapElementNumber;
            
            let movement = engine.entities.findOne(PlayerMoveComponent).get<PlayerMoveComponent>(PlayerMoveComponent);
            movement.path = this.buildPath(currentPlayerPosition, targetPosition, engine);
        }
    }

    private buildPath(start: number, end: number, engine: IEngine): number[] {
        let gameSettings = engine.entities.findOne(SettingsComponent).get(SettingsComponent);

        let indexedMap = this.createIndexedMap(engine, gameSettings.gameSettings.map.width);
        let settings = {
            gScoreStrategy: new SquareGScoreStrategy(),
            fScoreStrategy: new FScoreStrategy(indexedMap),
            neighborsSearchStrategy: new RhombusNieghborsSearchStrategy(indexedMap, false, false)
        };
        let pathSearcher = new PathSearcher();
        let path = pathSearcher.getPath(indexedMap.getElement(start), indexedMap.getElement(end), settings);
        return path.map(e => indexedMap.getIndex(e));
    }

    private createIndexedMap(engine: IEngine, mapWidth: number): IndexedMap {
        let mapElements = engine.entities.findMany(MapElementComponent);
        let map: any = [];
        for(let i = 0; i < mapElements.length; i++){
            let mapElement = mapElements[i].get<MapElementComponent>(MapElementComponent.name);
            map[mapElement.num] = {
                speed: 1,
                isBlocked: false
            };;
        }
        return new IndexedMap(map, mapWidth);
    }
}