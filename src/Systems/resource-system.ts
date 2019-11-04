import { ISystem } from "adane-ecs"

export class ResourceSystem implements ISystem{
    update(engine: import("adane-ecs").IEngine): void {
        throw new Error("Method not implemented.");
    }
}