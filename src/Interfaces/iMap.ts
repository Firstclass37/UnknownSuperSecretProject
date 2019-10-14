import { Point } from "../Model/point";
import { IMapElement } from "./iMapElement";

export interface IMap{
    Map: IMapElement[][];

    GetIndex(element: IMapElement): Point;

    GetElement(point: Point): IMapElement;
}