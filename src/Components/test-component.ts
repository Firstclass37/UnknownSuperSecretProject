import { IComponent } from "adane-ecs";
import { Key } from "adane-ecs-input";

export class TestComponent implements IComponent{
    constructor(public key: Key){}
}