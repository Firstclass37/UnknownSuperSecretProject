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
import { MovementSystem } from "./movement-system";
import { MoveSystem } from "./move-system";
import { ChangePositionSystem } from "./change-position-system";
import { OneLifeMapElementSystem } from "./one-life-map-element-system";
import { ChangeCoordinatesSystem } from "./change-coordinates-system";
import { MapElementDestructionSystem } from "./map-element-destruction-system";
import { InputTestSystem } from "./input-test-system";
import { InputComponent, KeyboardInputTrigger, Key} from "adane-ecs-input";
import { TestComponent } from "../Components/test-component";
import { CameraComponent } from "../Components/camera-component";
import { CameraMoveSystem } from "./camera-move-system";
import { CameraMoveComponent } from "../Components/camera-move-component";
import { CameraFollowSystem } from "./camera-follow-system";
import { CameraScrollSystem } from "./camera-scroll-system";
import { KeyTakeSystem } from "./key-take-system";
import { ChangeSpriteSystem } from "./change-sprite-system";
import { OpenDoorSystem } from "./open-door-system";
import { MapObjectRenderSystem } from "./map-object-render-system";

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
        engine.entities.add(new Entity(Guid.newGuid(), new TestComponent(Key.RIGHT) ,new InputComponent(new KeyboardInputTrigger(Key.RIGHT, null, null))));
        engine.entities.add(new Entity(Guid.newGuid(), new TestComponent(Key.LEFT) ,new InputComponent(new KeyboardInputTrigger(Key.LEFT, null, null))));
        engine.entities.add(new Entity(Guid.newGuid(), new TestComponent(Key.DOWN) ,new InputComponent(new KeyboardInputTrigger(Key.DOWN, null, null))));
        engine.entities.add(new Entity(Guid.newGuid(), new TestComponent(Key.UP) ,new InputComponent(new KeyboardInputTrigger(Key.UP, null, null))));
        engine.entities.add(new Entity(Guid.newGuid(), new CameraComponent(240, 300, 0, 100), new CameraMoveComponent(true, 0, 0, 5)));

        engine.addSystem(new InputTestSystem());
        engine.addSystem(new MapBuildSystem());
        engine.addSystem(new MapRenderSystem());
        engine.addSystem(new MapObjectRenderSystem());
        engine.addSystem(new ChangeSpriteSystem());
        engine.addSystem(new ChangePositionSystem());
        engine.addSystem(new OneLifeMapElementSystem());
        engine.addSystem(new MapElementDestructionSystem());
        engine.addSystem(new MovementSystem());
        engine.addSystem(new MoveSystem());
        engine.addSystem(new KeyTakeSystem());
        engine.addSystem(new OpenDoorSystem());
        engine.addSystem(new CameraMoveSystem());
        engine.addSystem(new CameraFollowSystem());
        engine.addSystem(new CameraScrollSystem());
        engine.addSystem(new ChangeCoordinatesSystem());
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
            AssetsConsts.key,
            AssetsConsts.doorClosed,
            AssetsConsts.doorOpened,

            AssetsConsts.gameSettings,
            AssetsConsts.mapSettings,
        ];
    }

}