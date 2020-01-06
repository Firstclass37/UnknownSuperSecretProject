import { IComponent } from "adane-ecs"

export class AbsolutePositionComponent implements IComponent {
    constructor(
        public x: number, 
        public y: number,
        public staticc: boolean = false)
    {}
}