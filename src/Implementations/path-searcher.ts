import { IPathSearcher } from "../Interfaces/i-path-searcher";
import { IMapElement } from "../Interfaces/i-map-element";
import { IMap } from "../Interfaces/i-map";
import { Point } from "../Model/point";

export class PathSearcher implements IPathSearcher{

    getPath(map: IMap, start: IMapElement, end: IMapElement): IMapElement[] {
        let startPoint = map.getIndex(start);
        let endPoint = map.getIndex(end);

        let closed: Point[] = [];
        let open: Point[] = [];
        
        let pathMap = new Map<Point, Point>();

        let cost = new Map<Point, number>();
        cost.set(startPoint, 0);

        let lengths = new Map<Point, number>();
        cost.set(startPoint, this.getPathLength(startPoint, endPoint));

        while(open.length > 0){
            let curPoint = this.selectMin(lengths);
            if (this.equals(curPoint, endPoint)){
                return this.buildPath(pathMap, endPoint, map);
            }

            open = this.remove(open, curPoint);
            closed.push(curPoint);

            let neighbors = this.getNeighborsPoints(map, curPoint);
            for(let i = 0; i < neighbors.length; i++){
                let neighbor = neighbors[i];
                let neighborElem = map.getElement(neighbor);
                if (neighborElem.isBlocked){
                    continue;
                }

                let currentCost = cost.get(curPoint) +  this.getTurnCost(neighborElem.speed);
                let isOpen = open.indexOf(neighbor) > -1;
                if (!isOpen || currentCost < cost.get(neighbor)){
                    pathMap.delete(neighbor);
                    pathMap.set(neighbor, curPoint);

                    cost.delete(neighbor);
                    cost.set(neighbor, currentCost);

                    lengths.delete(neighbor);
                    lengths.set(neighbor, this.getPathPriority(this.getPathLength(neighbor, endPoint), currentCost));
                    if (!isOpen){
                        open.push(neighbor);
                    }
                }
            }
        }
        throw new Error("unknown error");
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

    remove(arr: Point[], point: Point): Point[]{
        var index = arr.findIndex(e => this.equals(e, point));
        return arr.splice(index, 1);
    }

    equals(first: Point, second: Point){
        return first.x == second.x && first.y == second.y;
    }

    buildPath(pathMap: Map<Point, Point>, end: Point, map: IMap): IMapElement[]{
        let path: Point[] = [ end ];
        while( path.length != pathMap.entries.length / 2 ){
            let lastElem = path[path.length - 1];
            pathMap.forEach((val, key) => {
                if (key == lastElem){
                    path.push(val);
                    return;
                }
            });
        }
        return path.map(e => map.getElement(e)).reverse();
    }

    selectMin(lengths: Map<Point, number>): Point{
        let min: number;
        let point: Point;
        lengths.forEach((val, key) => {
            if (point == null || min < val){
                point = key;
                min = val;
            }
        })
        return point;
    }

    getPathPriority(pathToEnd: number, turnCost: number): number {
        return pathToEnd + turnCost;
    }

    getTurnCost(speed: number): number {
        return 1 - speed;
    }

    getPathLength(from: Point, end: Point): number{
        return Math.pow(Math.pow(end.x - from.x, 2) + Math.pow(end.y - from.y, 2), 0.5);
    }
}