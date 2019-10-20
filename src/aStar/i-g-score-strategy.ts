export interface IGScoreStrategy<T>{
    get(start: T, end: T): number;
}