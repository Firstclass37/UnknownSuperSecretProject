import { IPathSearcher } from "../Interfaces/i-path-searcher";
import { IMapElement } from "../Interfaces/i-map-element";
import { IMap } from "../Interfaces/i-map";
import { Point } from "../Model/point";

export class PathSearcher implements IPathSearcher{

    getPath(map: IMap, start: IMapElement, end: IMapElement): IMapElement[] {
        let startPoint = map.getIndex(start);
        let endPoint = map.getIndex(end);

        let closed: Point[] = [];
        let open: Point[] = [ startPoint ];

        throw new Error("Method not implemented.");
    }    

    hasPath(map: IMap, start: IMapElement, end: IMapElement): boolean {
        return this.getPath(map, start, end) != null;
    }
    
    areNeighbors(map: IMap, first: IMapElement, second: IMapElement): boolean {
        let firstPoint = map.getIndex(first);
        let secondPoint = map.getIndex(second);
        return Math.abs(firstPoint.x - secondPoint.x) == 1 && Math.abs(firstPoint.y - secondPoint.y) == 1;
    }

    getNeighbors(map: IMap, element: IMapElement): IMapElement[] {
        return this.getNeighborsPoints(map, map.getIndex(element)).map(p => map.getElement(p));
    }

    getNeighborsPoints(map: IMap, point: Point, includeDiagonal: boolean = true): Point[]
    {
        let neighbors: Point[] = [];
        for (let i = Math.abs(point.x - 1); i <= Math.min(point.x + 1, map.map.length - 1); i++)
        {
            for (let j = Math.abs(point.y - 1); j <= Math.min(point.y + 1, map.map[i].length - 1); j++)
            {
                if (point.x == i && point.y == j)
                    continue;
                
                if (!includeDiagonal || point.x == i || point.y == j){
                    neighbors.push(new Point(i, j));
                }
            }
        }
        return neighbors;
    }
}