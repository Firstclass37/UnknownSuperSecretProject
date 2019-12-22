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
import { PlayerRenderSystem  } from "./player-render-system";
import { MovementSystem } from "./movement-system";
import { MoveSystem } from "./move-system";
import { ChangePositionSystem } from "./change-position-system";
import { OneLifeMapElementSystem } from "./one-life-map-element-system";
import { ChangeCoordinatesSystem } from "./change-coordinates-system";
import { MapElementDestructionSystem } from "./map-element-destruction-system";
import { InputTestSystem } from "./input-test-system";
import { InputComponent, PointerDownInputTrigger, KeyboardInputTrigger, Key} from "adane-ecs-input";
import { TestComponent } from "../Components/test-component";
import { CameraComponent } from "../Components/camera-component";
import { CameraMoveSystem } from "./camera-move-system";
import { CameraMoveComponent } from "../Components/camera-move-component";
import { CameraFollowSystem } from "./camera-follow-system";
import { CameraScrollSystem } from "./camera-scroll-system";

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
        engine.entities.add(new Entity(Guid.newGuid(), new TestComponent() ,new InputComponent(new KeyboardInputTrigger(Key.LEFT, Key.LEFT, Key.LEFT))));
        engine.entities.add(new Entity(Guid.newGuid(), new CameraComponent(240, 400, 0, 0), new CameraMoveComponent(true, 0, 0, 5)));

        engine.addSystem(new InputTestSystem());
        engine.addSystem(new MapBuildSystem());
        engine.addSystem(new MapRenderSystem());
        engine.addSystem(new PlayerRenderSystem());
        engine.addSystem(new MovementSystem());
        engine.addSystem(new MoveSystem());
        engine.addSystem(new MovementSystem());
        engine.addSystem(new ChangePositionSystem());
        engine.addSystem(new OneLifeMapElementSystem());
        engine.addSystem(new ChangeCoordinatesSystem());
        engine.addSystem(new MapElementDestructionSystem());
        engine.addSystem(new CameraMoveSystem());
        engine.addSystem(new CameraFollowSystem());
        engine.addSystem(new CameraScrollSystem());
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
            AssetsConsts.mapElementDestructed,

            AssetsConsts.gameSettings,
            AssetsConsts.mapSettings,
        ];
    }

}