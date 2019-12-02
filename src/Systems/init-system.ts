import { ISystem, IEngine, IInitializableEvent, IDisposableEvent, Entity } from "adane-ecs"
import { Guid } from "adane-system";
import { BonusComponent } from "../Components/bonus-component";
import { BonusActivationSystem } from "./bonus-activation-system";
import { DestructionComponent } from "../Components/destruction-component";
import { DurationComponent } from "../Components/duration-components";
import { NameComponent } from "../Components/name-component";
import { DescriptionComponent } from "../Components/description-component";
import { MapPositionComponent } from "../Components/map-position-component";
import { RenderComponent } from "../Components/render-component";
import { PlayerComponent } from "../Components/player-component";
import { PlayerStatsComponent } from "../Components/player-stats-component";
import { MapElementComponent } from "../Components/map-element-component";
import { BonusDeactivationSystem } from "./bonus-deactivation-system";
import { ResourceSystem } from "./resource-system";
import { ResourceDestructionComponent } from "./resource-destruction-system";
import { CrystalQuestSystem } from "./crystal-quest-system";
import { CrystalQuestComponent } from "../Components/crystal-quest-component";
import { CrystalComponent } from "../Components/crystal-component";
import { CrystalDestructionSystem } from "./crystal-destruction-system";
import { InteractionSystem } from "./interaction-system";
import { InteractionComponent } from "../Components/interaction-component";
import { MapElementDestructionSystem } from "./map-element-destruction-system";
import { MovementSystem } from "./movement-system";
import { PlayerMoveComponent } from "../Components/player-move-component";
import { OneLifeMapElementSystem } from "./one-life-map-element-system";
import { MoveSystem } from "./move-system";

export class InitSystem implements ISystem, IInitializableEvent, IDisposableEvent{

    initialize(engine: IEngine): void {
        this.addEnities(engine);
        this.addSystems(engine);
    }
    
    dispose(engine: IEngine): void {
        //clear all entities and systems
    }

    update(engine: IEngine): void {
    }

    private addSystems(engine: IEngine): void{
        // engine.addSystem(new BonusActivationSystem());
        // engine.addSystem(new BonusDeactivationSystem());
        // engine.addSystem(new BonusDeactivationSystem());
        // engine.addSystem(new ResourceSystem());
        // engine.addSystem(new ResourceDestructionComponent());
        // engine.addSystem(new CrystalQuestSystem());
        // engine.addSystem(new CrystalDestructionSystem());
        // engine.addSystem(new InteractionSystem());
        // engine.addSystem(new InputSystem());
        // engine.addSystem(new MapElementDestructionSystem());
        // engine.addSystem(new MovementSystem());
        // engine.addSystem(new MoveSystem());
        // engine.addSystem(new OneLifeMapElementSystem());
    }

    private addEnities(engine: IEngine): void{
        engine.entities.add(this.createBonusEnity());
        engine.entities.add(this.createPlayerEntity())
        for(let i = 0; i < 10; i++){
            engine.entities.add(this.createMapElementEntities(i))
        }
        for(let i = 0; i < 10; i++){
            engine.entities.add(this.createCrystal(i))
        }

        engine.entities.add(new Entity(Guid.newGuid(), new CrystalQuestComponent()));
        engine.entities.add(new Entity(Guid.newGuid(), new InteractionComponent()));
        engine.entities.add(new Entity(Guid.newGuid(), new PlayerMoveComponent()));
    }

    private createCrystal(num: number): Entity{
        return new Entity(
            Guid.newGuid(), 
            new RenderComponent(),
            new CrystalComponent(),
            new NameComponent(),
            new MapPositionComponent(),
            new DescriptionComponent(),
            new DestructionComponent());
    }

    private createBonusEnity(): Entity {
        return new Entity(
            Guid.newGuid(), 
            new BonusComponent(), 
            new BonusActivationSystem(), 
            new DestructionComponent(), 
            new DurationComponent(), 
            new NameComponent(), 
            new DescriptionComponent(),
            new MapPositionComponent(),
            new RenderComponent());
    }

    private createPlayerEntity(): Entity{
        return new Entity(
            Guid.newGuid(), 
            new PlayerComponent(),
            new PlayerStatsComponent(),
            new NameComponent(),
            new MapPositionComponent(),
            new RenderComponent());
    }

    private createMapElementEntities(num: number): Entity {
        return new Entity(
            Guid.newGuid(), 
            //new MapElementComponent(),
            new DestructionComponent(),
            new RenderComponent());
    }
}