import { INieighborsSearchStrategy } from "../../aStar/i-nieighbors-search-strategy";
import { IMapElement } from "../../Interfaces/i-map-element";
import { IndexedMap } from "../indexed-map";

export class SquareNieghborsSearchStrategy implements INieighborsSearchStrategy<IMapElement>{
    diagonalAvailable: boolean;
    map: IndexedMap;

    constructor(map: IndexedMap){
        this.map = map;
    }

    search(element: IMapElement): IMapElement[] {
        let elementIndex = this.map.getIndex(element);
        return this.getNieghbors(elementIndex);
    }

    getNieghbors(index: number){
        let nieghbors: IMapElement[] = [];

        let rowCount = this.map.map.length / this.map.width;
        let elementRow = index / this.map.width;
        let elementPos = index % this.map.width;

        for (let row = Math.max(elementRow - 1, 0); row <= Math.min(elementRow + 1, rowCount); row++){
            for(let pos = Math.max(elementPos - 1, 0); pos <= Math.min(elementPos + 1, this.map.width - 1); pos++){
                if (elementPos == pos && elementRow == row){
                    continue;
                }

                if (!this.diagonalAvailable || pos == elementPos || row == elementRow){
                    nieghbors.push(this.map.getElement(row * this.map.width + pos));
                }
            }
        }
        return nieghbors;
    }
}