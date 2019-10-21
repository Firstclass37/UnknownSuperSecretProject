import { INieighborsSearchStrategy } from "../../aStar/i-nieighbors-search-strategy";
import { IMapElement } from "../../Interfaces/i-map-element";
import { IMap } from "../../Interfaces/i-map";
import { Point } from "../../Model/point";

export class SquareNieghborsSearchStrategy implements INieighborsSearchStrategy<IMapElement>{
    diagonalAvailable: boolean;
    map: IMap;

    constructor(map: IMap){
        this.map = map;
    }

    search(element: IMapElement): IMapElement[] {
        for(let i = 0; i < this.map.map.length; i++){
            for(let j = 0; j < this.map.map[i].length; j++){
                if (this.map.map[i][j] == element){
                    return this.getNieghbors(i, j);
                }
            }
            
        }
        throw new Error("element does not exist");
    }

    getNieghbors(x: number, y: number){
        let nieghbors: IMapElement[] = [];
        for (let i = Math.abs(x - 1); i <= Math.min(y + 1, this.map.map.length - 1); i++)
        {
            for (let j = Math.abs(y - 1); j <= Math.min(y + 1, this.map.map[i].length - 1); j++)
            {
                if (x == i && y == j)
                    continue;

                if (!this.diagonalAvailable || x == i || y == j){
                    nieghbors.push(this.map.getElement(new Point(i, j)));
                }
            }
        }
        return nieghbors;
    }
}