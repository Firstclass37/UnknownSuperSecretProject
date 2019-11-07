import { ISystem, IEngine, IInitializableEvent, IDisposableEvent } from "adane-ecs"


export class InitSystem implements ISystem, IInitializableEvent, IDisposableEvent{

    initialize(engine: IEngine): void {
        //add all systems and entities
        
    }
    dispose(engine: IEngine): void {
        //clear all entities and systems
    }

    update(engine: IEngine): void {
    }
}