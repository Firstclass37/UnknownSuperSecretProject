import { IMap } from "../Interfaces/i-map";
import { IMapElement } from "../Interfaces/i-map-element";
import { Point } from "../Model/point";

export class Map implements IMap{

    map: IMapElement[][];   
    
    getIndex(element: IMapElement): Point {
        for(let i = 0; i < this.map.length; i++){
            for(let j =0; j < this.map[i].length; j++){
                if (this.map[i][j] == element)
                    return new Point(i, j);
            }
        }
        throw new Error('elemet was not found');
    }

    getElement(point: Point): IMapElement {
        return this.map[point.x][point.y];
    }
}