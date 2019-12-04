import { ISystem, IEngine, IInitializableEvent, Entity } from "adane-ecs";
import { Task } from "adane-ecs-tasks";
import { LoadAssetTask } from "adane-ecs-graphics-ext";
import { MapBuildSystem } from "./map-build-system";
import { MapRenderSystem } from "./map-render-system";
import { AssetsConsts } from '../assets-consts';
import { AssetBatchComponent } from "adane-ecs-graphics"
import { Asset } from "adane-ecs-graphics/lib/components/asset-batch-component";
import { GameSettings } from "../game-settings";
import { MapSetting } from "../map-settings";
import { Guid } from "adane-system";
import { SettingsComponent } from "../Components/settings-componen";
import { SelectMapElementSystem } from "./select-map-elem-system";
import { PlayerRenderSystem  } from "./player-render-system";
import { MovementSystem } from "./movement-system";
import { ShowMovementPathSystem } from "./show-movement-path-system";


export class BootstrapSystem implements ISystem, IInitializableEvent{

    initialize(engine: IEngine): void {

        Task.start(this, new LoadAssetTask('squareAssetLoading', this.getAssets()))
            .onComplete((t) => this.goNext(engine));
    }

    update(engine: IEngine): void {
    }

    goNext(engine: IEngine){
        let assets = engine.entities.findOne(AssetBatchComponent).get(AssetBatchComponent).assets;
        engine.entities.add(new Entity(Guid.newGuid(), new SettingsComponent(this.getGameSetting(assets), this.getMapSetting(assets))));

        engine.addSystem(new MapBuildSystem());
        engine.addSystem(new MapRenderSystem());
        engine.addSystem(new SelectMapElementSystem());
        engine.addSystem(new PlayerRenderSystem());
        engine.addSystem(new MovementSystem());
        engine.addSystem(new ShowMovementPathSystem());

    }

    private getGameSetting(assets: Asset[]): GameSettings{
        return assets.filter(a => a.path == AssetsConsts.gameSettings)[0].reference;
    }

    private getMapSetting(assets: Asset[]): MapSetting{
        return assets.filter(a => a.path == AssetsConsts.mapSettings)[0].reference;
    }

    private getAssets(): string[]{
        return [
            AssetsConsts.mapElementSprite,
            AssetsConsts.bootsSprite,
            AssetsConsts.crystalSprite,
            AssetsConsts.playerSprite,
            AssetsConsts.shieldSprite,
            AssetsConsts.towerSprite,
            AssetsConsts.mapElementSprite2,
            AssetsConsts.mapElementSelectedSprite,

            AssetsConsts.gameSettings,
            AssetsConsts.mapSettings,
        ];
    }

}