import { IPathSearcher } from "../Interfaces/i-path-searcher";
import { ISetting } from "./i-setting";

export class PathSearcher<T> implements IPathSearcher<T>{

    getPath<T>(start: T, end: T, setting: ISetting<T>): T[] {
        let open: T[] = [ start ];
        let pathMap = new Map<T, T>();

        let gScore = new Map<T, number>();
        gScore.set(start, 0);

        let fScore = new Map<T, number>();
        fScore.set(start, setting.fScoreStrategy.get(start, end, 0));

        while(open.length > 0) {
            let current = this.selectMin(fScore);
            if (current == end){
                return this.buildPath(pathMap, end);
            }
            open.splice(open.indexOf(current), 1);
            let neighbors = setting.neighborsSearchStrategy.search(current);
            for(let i = 0; i < neighbors.length; i++){
                let neighbor = neighbors[i];
                var currentGScore = gScore.get(current) + setting.gScoreStrategy.get(current, neighbor);
                if (!gScore.has(neighbor) || currentGScore < gScore.get(neighbor)){
                    pathMap.delete(neighbor);
                    pathMap.set(neighbor, current);

                    gScore.delete(neighbor);
                    gScore.set(neighbor, currentGScore);

                    fScore.delete(neighbor);
                    fScore.set(neighbor, setting.fScoreStrategy.get(neighbor, end, currentGScore));
                    if (open.indexOf(neighbor) == -1){
                        open.push(neighbor);
                    }
                }
            }
        }
        return [];
    }    

    hasPath<T>(start: T, end: T, setting: ISetting<T>): boolean {
        return this.getPath(start, end, setting) != null;
    }
    
    areNeighbors<T>(first: T, second: T, setting: ISetting<T>): boolean {
        var neighbors = setting.neighborsSearchStrategy.search(first);
        return neighbors.indexOf(second) >= 0
    }

    getNeighbors<T>(first: T, setting: ISetting<T>): T[] {
        return setting.neighborsSearchStrategy.search(first);
    }

    buildPath<T>(pathMap: Map<T, T>, end: T): T[]{
        let path: T[] = [];
        
        let keys = Array.from(pathMap.keys()).reverse();
        
        let last: T = end;
        for(let i = keys.length - 1; i >= 0; i--){
            let currKey = keys[i];
            let currVal = pathMap.get(currKey);

             if (last == currKey){
                 last = currKey;

                path.push(currVal);
                path.push(currKey);
            }
        }
        return path.reverse();
    }

    selectMin<T>(lengths: Map<T, number>): T{
        let min: number;
        let point: T;
        lengths.forEach((val, key) => {
            if (point == null || val < min){
                point = key;
                min = val;
            }
        })
        return point;
    }
}