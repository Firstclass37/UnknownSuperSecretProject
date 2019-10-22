import { INieighborsSearchStrategy } from "../../aStar/i-nieighbors-search-strategy";
import { IMapElement } from "../../Interfaces/i-map-element";
import { IIndexedMap } from "../../Interfaces/i-indexed-map";

export class HexagonHieghborsStrategy implements INieighborsSearchStrategy<IMapElement>{

    constructor(private map: IIndexedMap, private even: boolean){

    }

    search(element: IMapElement): IMapElement[] {
        let elementIndex = this.map.getIndex(element);
        return this.getNieghbors(elementIndex);
    }

    getNieghbors(elementIndex: number): IMapElement[]{
        let nieghbors: IMapElement[] = [];

        let rowCount = this.map.map.length / this.map.width;
        let elementRow = elementIndex / this.map.width;
        let elementRowPos = elementIndex % this.map.width;

        for(let row = elementRow - 1 >= 0 ? elementRow - 1 : elementRow + 1; row < Math.min(elementRow + 1, rowCount); row += 2){
            let firstNieghborIndex = row * this.map.width + elementRowPos;
            nieghbors.push(this.map.getElement(firstNieghborIndex));

            let secondNieghborIndex = firstNieghborIndex + this.getNieghborOffset(elementRow);
            if (secondNieghborIndex >= 0 && secondNieghborIndex <= this.map.width){
                nieghbors.push(this.map.getElement(secondNieghborIndex));
            }
        }

        for(let i = Math.max(elementIndex - 1, elementIndex + 1); elementIndex < Math.min(elementIndex + 1, this.map.map.length - 1); elementIndex += 2){
            nieghbors.push(this.map.getElement(i));
        }
        return nieghbors;
    }

    getNieghborOffset(elementRow: number): number{
        return (elementRow % 2 == 0) == this.even ? 1 : -1;
    }
}