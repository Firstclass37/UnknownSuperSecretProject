import { INieighborsSearchStrategy } from "../../aStar/i-nieighbors-search-strategy";
import { IMapElement } from "../../Interfaces/i-map-element";
import { IndexedMap } from "../indexed-map";

export class RhombusNieghborsSearchStrategy implements INieighborsSearchStrategy<IMapElement>{
    map: IndexedMap;

    constructor(map: IndexedMap, private diagonalAvailable: boolean, private even: boolean){
        this.map = map;
    }

    search(element: IMapElement): IMapElement[] {
        let elementIndex = this.map.getIndex(element);
        return this.getNieghbors(elementIndex);
    }

    getNieghbors(index: number): IMapElement[]{
        let nieghbors: number[] = [];

        for(let i = 0; i < this.map.map.length; i++){
            let hasLeft = this.even 
                ? (i + this.map.width - 1) % (2 * this.map.width - 1) == 0 
                : i % (2 * this.map.width - 1) == 0;
            let hasRight = this.even 
                ? i % (2 * this.map.width - 1) == 0 
                : (i - this.map.width + 1) % (2 * this.map.width - 1) == 0;

            if (hasLeft){
                nieghbors.push(i - this.map.width);
                nieghbors.push(i + this.map.width - 1);
            }
            if (hasRight){
                nieghbors.push(i + this.map.width - 1);
                nieghbors.push(i + this.map.width );    
            }
            
            if (this.diagonalAvailable)
            {
                if (hasLeft){
                    nieghbors.push(i + 1);
                }
                if (hasRight){
                    nieghbors.push(i - 1);
                }
                nieghbors.push(i + this.map.width + this.map.width - 1);
                nieghbors.push(i - this.map.width - this.map.width - 1);
            }
        }
        return nieghbors
            .filter(e => e >= 0 && e <= this.map.map.length)
            .map(e => this.map.getElement(e));
        
    }   
}