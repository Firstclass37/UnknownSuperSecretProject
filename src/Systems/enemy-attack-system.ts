import { IEngine, ISystem, Entity } from "adane-ecs";
import { EnemyComponent } from "../Components/enemy-component";
import { PlayerComponent } from "../Components/player-component";
import { EnemyVisionComponent } from "../Components/enemy-vision-component";
import { Guid } from "adane-system";
import { DamageComponent } from "../Components/damage-component";
import { MapPositionComponent } from "../Components/map-position-component";

export class EnemyAttackSystem implements ISystem{
    update(engine: IEngine): void {
        let enemies = engine.entities.findMany(EnemyComponent);
        let player = engine.entities.findOne(PlayerComponent);
        enemies.forEach(e => {
            if (this.tryAttack(player, e)){
                this.commitAttack(e, engine);
            };
        });
    }

    private tryAttack(player: Entity, enemy: Entity): boolean{
        let enemyVision = enemy.get(EnemyVisionComponent);
        let enemyPos = enemy.get(MapPositionComponent).mapElementNumber;
        let playerPos = player.get(MapPositionComponent).mapElementNumber;
        return enemyPos === playerPos || enemyVision.vision && enemyVision.vision.indexOf(playerPos) > -1;
    }

    private commitAttack(enemy: Entity, engine: IEngine): void{
        let damageEntity = new Entity(Guid.newGuid(), new DamageComponent(enemy.identity, 1));
        engine.entities.add(damageEntity);
    }

}