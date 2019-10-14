import { Point } from "../Model/point";
import { IMapElement } from "./i-map-element";

export interface IMap{
    Map: IMapElement[][];

    GetIndex(element: IMapElement): Point;

    GetElement(point: Point): IMapElement;
}