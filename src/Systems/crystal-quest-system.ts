import { ISystem, IEngine, Entity } from "adane-ecs"
import { DestructionComponent } from "../Components/destruction-component";
import { CrystalQuestComponent } from "../Components/crystal-quest-component";
import { CrystalComponent } from "../Components/crystal-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { PlayerComponent } from "../Components/player-component";

export class CrystalQuestSystem implements ISystem{

    update(engine: IEngine): void {
        let crystalSequence = engine.entities.findOne(CrystalQuestComponent).get<CrystalQuestComponent>(CrystalQuestComponent.name).sequence;
        let crystals = engine.entities.findMany(CrystalComponent);
        let playerPos = engine.entities.findOne(PlayerComponent).get<MapPositionComponent>(MapPositionComponent.name);

        for(let i = 0; crystals.length; i++){
            let crystal = crystals[i];
            let crystalComp = crystal.get<CrystalComponent>(CrystalComponent.name);
            let destruction = crystal.get<DestructionComponent>(DestructionComponent.name);
            let position = crystal.get<MapPositionComponent>(MapPositionComponent.name);

            if (!destruction.needDestruct && 
                !crystalComp.raised && 
                playerPos.mapElementNumber == position.mapElementNumber &&
                this.canRaise(crystalComp, crystalSequence, crystals)){

                destruction.needDestruct = true;
                crystalComp.raised = true;
            }
        }
    }

    private canRaise(component: CrystalComponent, sequence: number[], otherCrystals: Entity[]): boolean {
        if (sequence[0] == component.number){
            return true;
        }

        let prevIndex = sequence.findIndex(e => e == component.number) - 1;
        return otherCrystals
            .map(e => e.get<CrystalComponent>(CrystalComponent.name))
            .filter(c => c.raised)
            .findIndex(c => c.number == prevIndex) != -1;
    }
}