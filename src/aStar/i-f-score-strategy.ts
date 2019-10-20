export interface IFScoreStrategy<T>{
    get(start: T, end: T, gScore: number): number;
}