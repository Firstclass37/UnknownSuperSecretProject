import { ISystem, IEngine, Entity } from "adane-ecs"
import { MapElementComponent } from "../Components/map-element-component";
import { PlayerMoveComponent } from "../Components/player-move-component";
import { PlayerComponent } from "../Components/player-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { IndexedMap } from "../Implementations/indexed-map";
import { PathSearcher } from "../aStar/path-searcher";
import { RhombusNieghborsSearchStrategy } from "../Implementations/Rhombus/rhombus-nieghbors-search-strategy";
import { SettingsComponent } from "../Components/settings-componen";
import { InputComponent } from "adane-ecs-input";
import { ChangeSpriteComponent } from "../Components/change-sprite-component";
import { AssetsConsts } from "../assets-consts";
import { RhombusFScoreStrategy } from "../Implementations/Rhombus/rhombus-fscore-strategy";
import { HexagonGScoreStrategy } from "../Implementations/Hexagon/hexagon-g-score-strategy";

export class MovementSystem implements ISystem {
    update(engine: IEngine): void {
        let interacted = this.findInput(engine);
        if (!interacted){
            return;
        }

        let targetPosition = interacted.get<MapElementComponent>(MapElementComponent).num;
        let currentPlayerPosition = engine.entities.findOne(PlayerComponent).get<MapPositionComponent>(MapPositionComponent).mapElementNumber;
        let playerMoveComponent = engine.entities.findOne(PlayerMoveComponent).get<PlayerMoveComponent>(PlayerMoveComponent);

        playerMoveComponent.new = false;
        if (playerMoveComponent.path && playerMoveComponent.path.length > 0 && playerMoveComponent.path[playerMoveComponent.path.length - 1] != targetPosition){
            this.show(engine, playerMoveComponent.path, false);
            playerMoveComponent.path = [];            
        }
        if (!playerMoveComponent.path || playerMoveComponent.path.length == 0){
            playerMoveComponent.path = this.buildPath(currentPlayerPosition, targetPosition, engine);
            playerMoveComponent.new = true;
            this.show(engine, playerMoveComponent.path, true);
        }
    }

    private buildPath(start: number, end: number, engine: IEngine): number[] {
        let gameSettings = engine.entities.findOne(SettingsComponent).get(SettingsComponent);

        let indexedMap = this.createIndexedMap(engine, gameSettings.gameSettings.map.width);
        let settings = {
            gScoreStrategy: new HexagonGScoreStrategy(),
            fScoreStrategy: new RhombusFScoreStrategy(indexedMap),
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
                isBlocked: false,
                num: mapElement.num
            };
        }
        return new IndexedMap(map, mapWidth);
    }

    private findInput(engine: IEngine): Entity{
        let entities = engine.entities.findMany(InputComponent, MapElementComponent);

        for(let i = 0; i < entities.length; i++){
            let curEntity = entities[i];
            if (curEntity.get(InputComponent).hit){
                return curEntity;                
            }
        }
        return null;
    }

    private show(engine: IEngine, path: number[], active: boolean){
        let mapElements = engine.entities.findMany(MapElementComponent).filter(e => path.indexOf(e.get(MapElementComponent).num) > -1)
        for(let i = 0; i < mapElements.length; i++){
            mapElements[i].get(ChangeSpriteComponent).asset = active ? AssetsConsts.mapElementSelectedSprite : AssetsConsts.mapElementSprite2;
        }
    }
}