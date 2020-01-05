import { IComponent } from "adane-ecs";

export class MapObjectRenderQueueComponent implements IComponent{
    constructor(
        public mapPosition: number, 
        public asset: string,
        public priority: number = 1,
        public offsetX: number = 0, 
        public offsetY: number = 0 
        ){
    }
}