import { Point } from "../Model/point";
import { IMapElement } from "./i-map-element";

export interface IMap{
    map: IMapElement[][];

    getIndex(element: IMapElement): Point;

    getElement(point: Point): IMapElement;
}