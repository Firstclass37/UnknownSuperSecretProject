import { IGScoreStrategy } from "../../aStar/i-g-score-strategy";
import { IMapElement } from "../../Interfaces/i-map-element";

export class SquareGScoreStrategy implements IGScoreStrategy<IMapElement>{
    
    get(start: IMapElement, end: IMapElement): number {
        return 0.99 - end.speed;
    }
}