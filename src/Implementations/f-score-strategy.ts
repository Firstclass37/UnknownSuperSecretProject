import { IFScoreStrategy } from "../aStar/i-f-score-strategy";
import { IMapElement } from "../Interfaces/i-map-element";
import { IMap } from "../Interfaces/i-map";
import { Point } from "../Model/point";

export class FScoreStrategy implements IFScoreStrategy<IMapElement>{

    constructor(private map: IMap){

    }

    get(start: IMapElement, end: IMapElement, gScore: number): number {
        return this.getLength(this.map.getIndex(start), this.map.getIndex(end)) + gScore;
    }

    getLength(from: Point, end: Point): number{
        return Math.pow(Math.pow(end.x - from.x, 2) + Math.pow(end.y - from.y, 2), 0.5);
    }
}