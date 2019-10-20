import { IGScoreStrategy } from "./i-g-score-strategy";
import { IFScoreStrategy } from "./i-f-score-strategy";
import { INieighborsSearchStrategy } from "./i-nieighbors-search-strategy";

export interface ISetting<T>{
    gScoreStrategy: IGScoreStrategy<T>;
    fScoreStrategy: IFScoreStrategy<T>;
    neighborsSearchStrategy: INieighborsSearchStrategy<T>;
}