import { ISystem, IEngine, Entity } from "adane-ecs";
import { DamageComponent } from "../Components/damage-component";
import { PlayerComponent } from "../Components/player-component";

export class DamageSystem implements ISystem{

    update(engine: IEngine): void {
        let damages = engine.entities.findMany(DamageComponent);
        let player = engine.entities.findOne(PlayerComponent);
        damages.forEach(d => {
            this.apply(d.get(DamageComponent), player);
            engine.entities.remove(d);
        });
    }

    private apply(damage: DamageComponent, player: Entity): void{
        player.get(PlayerComponent).alive = false;
    }
}