import { IMapElement } from "./i-map-element";
import { IMap } from "./i-map";

export interface IPathSearcher{
    getPath(map: IMap, start: IMapElement, end: IMapElement): IMapElement[];

    hasPath(map: IMap, start: IMapElement, end: IMapElement): boolean;

    areNeighbors(map: IMap, first: IMapElement, second: IMapElement): boolean;

    getNeighbors(map: IMap, element: IMapElement): IMapElement[];
}