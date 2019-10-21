import { INieighborsSearchStrategy } from "../../aStar/i-nieighbors-search-strategy";
import { IMapElement } from "../../Interfaces/i-map-element";

export class HexagonHieghborsStrategy implements INieighborsSearchStrategy<IMapElement>{

    constructor(private map: IMapElement[], private size: number, private even: boolean){

    }

    search(element: IMapElement): IMapElement[] {
        for(let i = 0; i < this.map.length; i++){
            if (this.map[i] == element){
                return this.getNieghbors(i);
            }
        }
        throw new Error("element does not exist");
    }

    getNieghbors(pos: number): IMapElement[]{
        let nieghbors: IMapElement[] = [];

        let rowCount = this.map.length / this.size;
        let elementRow = pos % this.size;
        let elementRowPos = pos - elementRow * this.size;

        for(let row = Math.max(elementRow - 1, elementRow + 1); row < Math.min(elementRow + 1, rowCount); row += 2){
            let firstNieghbor = row * this.size + elementRowPos;
            nieghbors.push(this.map[firstNieghbor]);
            if ((elementRow % 2 == 0) == this.even){
                let nieghborIndex = firstNieghbor + 1;
                if (nieghborIndex < this.map.length){
                    nieghbors.push(this.map[nieghborIndex]);
                }
            }
            else{
                let nieghborIndex = firstNieghbor - 1;
                if (nieghborIndex >= 0){
                    nieghbors.push(this.map[nieghborIndex])
                };
            }
        }
        for(let i = Math.max(pos - 1, pos + 1); pos < Math.min(pos + 1, this.map.length - 1); pos += 2){
            nieghbors.push(this.map[i]);
        }
        return nieghbors;
    }
}