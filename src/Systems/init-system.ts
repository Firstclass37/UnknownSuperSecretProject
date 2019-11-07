import { ISystem, IEngine, IInitializableEvent, IDisposableEvent, Entity } from "adane-ecs"
import { Guid } from "adane-system";
import { BonusComponent } from "../Components/bonus-component";
import { BonusActivationSystem } from "./bonus-activation-system";
import { DestructionComponent } from "../Components/destruction-component";
import { DurationComponent } from "../Components/duration-components";
import { NameComponent } from "../Components/name-component";
import { DescriptionComponent } from "../Components/description-component";
import { PositionComponent } from "../Components/position-component";
import { RenderComponent } from "../Components/render-component";
import { PlayerComponent } from "../Components/player-component";
import { PlayerStatsComponent } from "../Components/player-stats-component";
import { MapElementComponent } from "../Components/map-element-component";

export class InitSystem implements ISystem, IInitializableEvent, IDisposableEvent{

    initialize(engine: IEngine): void {
        this.AddEnities(engine);
        this.AddSystems(engine);
    }
    
    dispose(engine: IEngine): void {
        //clear all entities and systems
    }

    update(engine: IEngine): void {
    }

    private AddSystems(engine: IEngine): void{

    }

    private AddEnities(engine: IEngine): void{
        engine.entities.add(this.CreateBonusEnity());
        engine.entities.add(this.CreatePlayerEntity())
        for(let i = 0; i < 10; i++){
            engine.entities.add(this.CreateMapElementEntities(i))
        }
    }

    private CreateBonusEnity(): Entity {
        return new Entity(
            Guid.newGuid(), 
            new BonusComponent(), 
            new BonusActivationSystem(), 
            new DestructionComponent(), 
            new DurationComponent(), 
            new NameComponent(), 
            new DescriptionComponent(),
            new PositionComponent(),
            new RenderComponent());
    }

    private CreatePlayerEntity(): Entity{
        return new Entity(
            Guid.newGuid(), 
            new PlayerComponent(),
            new PlayerStatsComponent(),
            new NameComponent(),
            new PositionComponent(),
            new RenderComponent());
    }

    private CreateMapElementEntities(num: number): Entity {
        return new Entity(
            Guid.newGuid(), 
            new MapElementComponent(),
            new DestructionComponent(),
            new RenderComponent());
    }
}