import { IComponent } from "adane-ecs";
import { GameSettings } from "../game-settings";
import { MapSetting } from "../map-settings";

export class SettingsComponent implements IComponent{
    constructor(
        public gameSettings: GameSettings, 
        public mapSettings: MapSetting){
            
        }

}