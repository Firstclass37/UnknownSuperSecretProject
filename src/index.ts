import { PixiHost } from "adane-ecs-pixi";

let settings = {
    width: 800,
    height: 640
}
let host = new PixiHost();
host.run(settings, []);