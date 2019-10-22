import { IFScoreStrategy } from "../aStar/i-f-score-strategy";
import { IMapElement } from "../Interfaces/i-map-element";
import { IIndexedMap } from "../Interfaces/i-indexed-map";

export class FScoreStrategy implements IFScoreStrategy<IMapElement>{

    constructor(private map: IIndexedMap){

    }

    get(start: IMapElement, end: IMapElement, gScore: number): number {
        return this.getLength(this.map.getIndex(start), this.map.getIndex(end)) + gScore;
    }

    getLength(start: number, end: number): number{
        return Math.pow(Math.pow(start / this.map.width - end / this.map.width, 2) + Math.pow(start % this.map.width - end % this.map.width, 2), 0.5);
    }
}