import { ISystem, IEngine, Entity } from "adane-ecs"
import { MapElementComponent } from "../Components/map-element-component";
import { PlayerMoveComponent } from "../Components/player-move-component";
import { PlayerComponent } from "../Components/player-component";
import { MapPositionComponent } from "../Components/map-position-component";

export class MoveSystem implements ISystem {
    update(engine: IEngine): void {
        let currentPlayerPosition = engine.entities.findOne(PlayerComponent).get<MapPositionComponent>(MapPositionComponent.name);
        let movement = engine.entities.findOne(PlayerMoveComponent).get<PlayerMoveComponent>(PlayerMoveComponent.name);
        if (movement.path.indexOf(currentPlayerPosition.mapElementNumber) != movement.path.length - 1){
            let nextNum = movement.path[movement.path.indexOf(currentPlayerPosition.mapElementNumber) - 1];
            let nextMapElement = this.findElement(nextNum, engine).get<MapElementComponent>(MapElementComponent.name);

            this.moveTo(nextMapElement, engine);
            currentPlayerPosition.mapElementNumber = this.getPlayerPosition(engine);
        }     
    }

    private moveTo(target: MapElementComponent, engine: IEngine): void{
        //login for changing player absolute coordinates
    }

    private getPlayerPosition(engine: IEngine): number{
        //calculate current player map element position
        return 0;
    }

    private findElement(num: number, engine: IEngine): Entity{
        return engine.entities.findMany(MapElementComponent)
            .filter(e => e.get<MapElementComponent>(MapElementComponent.name).num == num)[0];
    }
}