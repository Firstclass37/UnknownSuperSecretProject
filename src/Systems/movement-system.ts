import { ISystem, IEngine } from "adane-ecs"
import { InteractionComponent } from "../Components/interaction-component";
import { MapElementComponent } from "../Components/map-element-component";
import { PlayerMoveComponent } from "../Components/player-move-component";
import { PlayerComponent } from "../Components/player-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { SquareGScoreStrategy } from "../Implementations/Square/square-g-score-strategy";
import { FScoreStrategy } from "../Implementations/f-score-strategy";
import { IndexedMap } from "../Implementations/indexed-map";
import { SquareNieghborsSearchStrategy } from "../Implementations/Square/square-nieghbors-search-strategy";
import { PathSearcher } from "../aStar/path-searcher";
import { DestructionComponent } from "../Components/destruction-component";

export class MovementSystem implements ISystem {
    update(engine: IEngine): void {
        let interacted = engine.entities.findOne(InteractionComponent).get<InteractionComponent>(InteractionComponent.name);
        if (interacted){
            let entity = engine.entities.get(interacted.lastInteractedWithId);
            if (entity.has(MapElementComponent.name)) {
                let targetPosition = entity.get<MapElementComponent>(MapElementComponent.name);
                let currentPlayerPosition = engine.entities.findOne(PlayerComponent).get<MapPositionComponent>(MapPositionComponent.name);
                
                let movement = engine.entities.findOne(PlayerMoveComponent).get<PlayerMoveComponent>(PlayerMoveComponent.name);
                movement.path = this.buildPath(currentPlayerPosition.mapElementNumber, targetPosition.num, engine);
            }
        }
    }

    private buildPath(start: number, end: number, engine: IEngine): number[] {
        let indexedMap = this.createIndexedMap(engine);
        let settings = {
            gScoreStrategy: new SquareGScoreStrategy(),
            fScoreStrategy: new FScoreStrategy(indexedMap),
            neighborsSearchStrategy: new SquareNieghborsSearchStrategy(indexedMap, false)
        };
        let pathSearcher = new PathSearcher();
        let path = pathSearcher.getPath(indexedMap.getElement(start), indexedMap.getElement(end), settings);
        return path.map(e => indexedMap.getIndex(e));
    }

    private createIndexedMap(engine: IEngine): IndexedMap {
        let mapElements = engine.entities.findMany(MapElementComponent);
        let map: any = [];
        for(let i = 0; i < mapElements.length; i++){
            let mapElement = mapElements[i].get<MapElementComponent>(MapElementComponent.name);
            map[mapElement.num] = {
                speed: 1,
                isBlocked: mapElements[i].get<DestructionComponent>(DestructionComponent.name).needDestruct
            };;
        }
        return new IndexedMap(map);
    }
}