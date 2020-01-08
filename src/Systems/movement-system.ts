import { ISystem, IEngine, Entity } from "adane-ecs"
import { MapElementComponent } from "../Components/map-element-component";
import { PlayerMoveComponent } from "../Components/player-move-component";
import { PlayerComponent } from "../Components/player-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { InputComponent } from "adane-ecs-input";
import { ChangeSpriteComponent } from "../Components/change-sprite-component";
import { AssetsConsts } from "../assets-consts";
import { MapExtentions } from "../Helpers/map-extentions";

export class MovementSystem implements ISystem {
    update(engine: IEngine): void {
        this.finishMovement(engine);
        
        let playerMoveComponent = engine.entities.findOne(PlayerMoveComponent).get<PlayerMoveComponent>(PlayerMoveComponent);
        playerMoveComponent.new = false;

        let interacted = this.findInput(engine);
        if (!interacted){
            return;
        }

        let targetPosition = interacted.get<MapElementComponent>(MapElementComponent).num;
        let currentPlayerPosition = engine.entities.findOne(PlayerComponent).get<MapPositionComponent>(MapPositionComponent).mapElementNumber;
        if (playerMoveComponent.path && playerMoveComponent.path.length > 0 && playerMoveComponent.path[playerMoveComponent.path.length - 1] != targetPosition){
            let path = playerMoveComponent.path.splice(playerMoveComponent.path.indexOf(currentPlayerPosition));
            this.show(engine, path, false);
            this.resetMovement(playerMoveComponent);            
        }
        playerMoveComponent.path = MapExtentions.buildPath(currentPlayerPosition, targetPosition, engine);
        playerMoveComponent.new = true;
        this.show(engine, playerMoveComponent.path, true);
    }

    private finishMovement(engine: IEngine): void{
        let currentPlayerPosition = engine.entities.findOne(PlayerComponent).get<MapPositionComponent>(MapPositionComponent).mapElementNumber;
        let moveComponent = engine.entities.findOne(PlayerMoveComponent).get<PlayerMoveComponent>(PlayerMoveComponent);
        if (moveComponent.path && moveComponent.path.length > 0 && moveComponent.path[moveComponent.path.length - 1] == currentPlayerPosition){
            this.show(engine, [ currentPlayerPosition ], false);
            this.resetMovement(moveComponent);
        }
    }

    private resetMovement(movement: PlayerMoveComponent): void{
        movement.new = false;
        movement.path = [];
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