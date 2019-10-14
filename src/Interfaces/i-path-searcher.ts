import { IMapElement } from "./i-map-element";
import { IMap } from "./i-map";

export interface IPathSearcher{
    SearchPath(map: IMap, start: IMapElement, end: IMapElement): IMapElement[];

    HasPath(map: IMap, start: IMapElement, end: IMapElement): boolean;

    IsNeighbors(map: IMap, first: IMapElement, second: IMapElement): boolean;

    GetNeighbors(map: IMap, element: IMapElement): IMapElement[];
}