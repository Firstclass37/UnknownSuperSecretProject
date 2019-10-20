export interface INieighborsSearchStrategy<T>{
    search(element: T): T[];
}