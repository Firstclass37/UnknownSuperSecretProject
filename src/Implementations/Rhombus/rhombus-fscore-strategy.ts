import { IFScoreStrategy } from "../../aStar/i-f-score-strategy";
import { IMapElement } from "../../Interfaces/i-map-element";
import { IIndexedMap } from "../../Interfaces/i-indexed-map";


export class RhombusFScoreStrategy implements IFScoreStrategy<IMapElement>{
    
    constructor(private map: IIndexedMap){

    }


    get(start: IMapElement, end: IMapElement, gScore: number): number {
        let startIndex = this.map.getIndex(start);
        let endIndex = this.map.getIndex(end);

        let startCoord = this.getCoord(startIndex);
        let endCoord = this.getCoord(endIndex);

        let length =  this.getLength(startCoord[0], startCoord[1], endCoord[0], endCoord[1]);
        //let length = Math.abs(endIndex - startIndex);
        return  length + gScore;
    }

    getCoord(index: number): number[]{
        let tempWidth = 2 * this.map.width - 1
        let bigRowCount = Math.floor((index - 1) / tempWidth);

        let pos = index - bigRowCount * tempWidth;

        let y = (pos <= this.map.width ? pos : pos - this.map.width);
        let x =  2 * bigRowCount + (pos <= this.map.width  ? 0 : 1) + 1;

        if (pos > this.map.width){
            x += 0.5
        }

        return [x, y];
    }

    getLength(startX: number, startY: number, endX: number, endY: number): number{
        return Math.pow(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2), 0.5);
    }
}