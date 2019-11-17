import { IIndexedMap } from "../Interfaces/i-indexed-map";
import { IMapElement } from "../Interfaces/i-map-element";

export class IndexedMap implements IIndexedMap{
    width: number;

    map: IMapElement[];   
    mapMap: Map<IMapElement, number>;

    constructor(map: IMapElement[]){
        this.map = map;
        this.mapMap = new Map<IMapElement, number>();
        for(let i = 0; i < map.length; i++){
            this.mapMap.set(map[i], i);
        }
    }

    getIndex(element: IMapElement): number {
        if (this.mapMap.has(element)) {
            return this.mapMap.get(element);
        }
        throw new Error('elemet was not found');
    }

    getElement(index: number): IMapElement {
        return this.map[index];
    }
}