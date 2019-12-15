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
        return this.getNieghbors(elementIndex).filter(e => !e.isBlocked);
    }

    getNieghbors(index: number): IMapElement[]{
        let nieghbors: number[] = [];

        let fullRowWidth = 2 * this.map.width - 1;

        let posIndex = index - 1;

        let hasLeft = this.even 
            ? (posIndex + this.map.width) % fullRowWidth != 0 
            : posIndex != 0 && (posIndex >= fullRowWidth ? posIndex % fullRowWidth != 0 : true);
        let hasRight = this.even 
            ? (posIndex + 1) % fullRowWidth != 0 
            : posIndex != this.map.width && (posIndex - this.map.width + 1 >= fullRowWidth ? (posIndex - this.map.width + 1) % fullRowWidth != 0 : true);

        if (hasLeft){
            nieghbors.push(index - this.map.width);
            nieghbors.push(index + this.map.width - 1);
        }
        if (hasRight){
            nieghbors.push(index - this.map.width + 1);
            nieghbors.push(index + this.map.width);    
        }
        
        if (this.diagonalAvailable)
        {
            if (hasLeft){
                nieghbors.push(index + 1);
            }
            if (hasRight){
                nieghbors.push(index - 1);
            }
            nieghbors.push(index + this.map.width + this.map.width - 1);
            nieghbors.push(index - this.map.width - this.map.width - 1);
        }

        return nieghbors
            .filter(e => e > 0 && e < this.map.map.length)
            .map(e => this.map.getElement(e));
        
    }   
}