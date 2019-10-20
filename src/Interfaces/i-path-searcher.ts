import { ISetting } from "../aStar/i-setting";

export interface IPathSearcher<T>{
    getPath(start: T, end: T, setting: ISetting<T>): T[];

    hasPath(start: T, end: T, setting: ISetting<T>): boolean;

    areNeighbors(first: T, second: T, setting: ISetting<T>): boolean;

    getNeighbors(element: T, setting: ISetting<T>): T[];
}