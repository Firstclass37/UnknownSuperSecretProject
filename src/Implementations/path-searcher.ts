import { IPathSearcher } from "../Interfaces/i-path-searcher";
import { IMapElement } from "../Interfaces/i-map-element";
import { IMap } from "../Interfaces/i-map";
import { Point } from "../Model/point";

export class PathSearcher implements IPathSearcher{

    SearchPath(map: IMap, start: IMapElement, end: IMapElement): IMapElement[] {
        throw new Error("Method not implemented.");
    }    

    HasPath(map: IMap, start: IMapElement, end: IMapElement): boolean {
        return this.SearchPath(map, start, end) != null;
    }
    
    IsNeighbors(map: IMap, first: IMapElement, second: IMapElement): boolean {
        let firstPoint = map.GetIndex(first);
        let secondPoint = map.GetIndex(second);
        return Math.abs(firstPoint.X - secondPoint.X) == 1 && Math.abs(firstPoint.Y - secondPoint.Y) == 1;
    }

    GetNeighbors(map: IMap, element: IMapElement): IMapElement[] {
        return this.GetNeighborsPoints(map, map.GetIndex(element)).map(p => map.GetElement(p));
    }

    GetNeighborsPoints(map: IMap, point: Point): Point[]
    {
        let neighbors: Point[] = [];
        for (let i = Math.abs(point.X - 1); i <= Math.min(point.X + 1, map.Map.length - 1); i++)
        {
            for (let j = Math.abs(point.Y - 1); j <= Math.min(point.Y + 1, map.Map[i].length - 1); j++)
            {
                if (point.X != i && point.Y != j)
                    neighbors.push(new Point(i, j));
            }
        }
        return neighbors;
    }


}