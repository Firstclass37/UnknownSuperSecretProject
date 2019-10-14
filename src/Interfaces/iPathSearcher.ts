import { IMapElement } from "./iMapElement";
import { IMap } from "./iMap";

export interface IPathSearcher{
    SearchPath(map: IMap, start: IMapElement, end: IMapElement): IMapElement[];

    HasPath(map: IMap, start: IMapElement, end: IMapElement): boolean;

    IsNeighbors(map: IMap, first: IMapElement, second: IMapElement): boolean;

    GetNeighbors(map: IMap, first: IMapElement, second: IMapElement): IMapElement[];
}