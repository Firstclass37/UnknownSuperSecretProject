import { IMapElement } from "./i-map-element";

export interface IIndexedMap{
    map: IMapElement[];

    width: number;

    getIndex(element: IMapElement): number;

    getElement(index: number): IMapElement;
}