import Materials from "./Materials";
import { TrimeshCollider } from "../Colliders/TrimeshCollider";
import { BoxCollider } from "../Colliders/BoxCollider";
import LoaderHelper from "../Utils/Helper/LoaderHelper";
import Light from "./Light";
import PhysicsDebugger from "./PhysicsDebugger";
import Render from "./Render";
import Options from "../../Options";
import * as CANNON from "cannon-es";
import * as THREE from "three";
import Camera from "./Camera";
import { GUI } from "dat.gui";
import heightMap from "./heightMap";
import SkillWorld from "./SkillWorld";
import Hud from "../../Game/Hud";
export default class World {
    public hud: Hud;
    public scene: THREE.Scene = new THREE.Scene();
    public physics = new CANNON.World();
    public render = new Render();
    public materials = new Materials(this.physics);
    public light = new Light(this.scene);
    public camera = new Camera(this.render);
    public physicsDebugger: PhysicsDebugger | undefined;
    public gui: GUI | undefined;
    public skillWorld: SkillWorld;

    constructor(hud: Hud) 
    {
        this.hud = hud;

        if (Options.CANON_DEBUG_MOD) {
            this.physicsDebugger = new PhysicsDebugger(this.scene, this.physics);
        }

        if (Options.GUI_DEBUG_MOD) {
            this.gui = new GUI();
            this.addGui();
        }

        this.initSceneOptions();
        this.initPhysicsOptions();
        this.initHeightMap();

        this.skillWorld = new SkillWorld(this.scene);
    }

    public _Update(delta: number) {
        this.physics.step(delta);
        this.render._Update(this.scene, this.camera.perspectiveCamera);
        this.skillWorld._Update(delta);
        if (Options.CANON_DEBUG_MOD) this.physicsDebugger?._Update();
    }

    private initSceneOptions() {
        this.scene.background = new THREE.Color(0x352ee8);
    }
    private initPhysicsOptions() {
        this.physics.gravity.set(0, -9.82, 0);
        let solver = new CANNON.GSSolver();
        //this.Physics.allowSleep = true;
        solver.iterations = Options.CANON_SOLVER_ITERATIONS;
        this.physics.solver = solver;
    }

    private initHeightMap() {
        const { hMap, pointDistance, position: [x, y, z] } = heightMap;
        const terrainShape = new CANNON.Heightfield(hMap, { elementSize: pointDistance });
        const terrain = new CANNON.Body({ mass: 0, shape: terrainShape, material: this.materials.worldFloorMaterial });

        terrain.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        terrain.position.set(x, y, z);

        this.physics.addBody(terrain);

        var texture = new THREE.TextureLoader().load('./Models/grassTexture2.jpg');
        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
        texture.repeat.set(128, 128);

        // var material = new THREE.MeshBasicMaterial( { map: texture, color: 0xffffff } );

        let tracker = LoaderHelper.loadGLTF('./Models/World/heightMapSceneT.glb', (gltf) => {
            var model = gltf.scene
            model.traverse((child: any) => {
                if (child.isMesh) {
                    var material = new THREE.MeshStandardMaterial({ map: texture, metalness: 0, roughness: 1 });

                    child.material = material;
                    child.receiveShadow = true;
                    child.castShadow = false;
                }
            })
            this.scene.add(model)
        })
    }

    private initWorld(): void {
        let tracker = LoaderHelper.loadGLTF('./Models/World/testScene.gltf', (gltf) => {
            gltf.scene.traverse((child: any) => {

                if (child.userData.hasOwnProperty('data')) {
                    if (child.userData.data === 'physics') {
                        if (child.userData.hasOwnProperty('type')) {
                            if (child.userData.type === 'box') {
                                this.createBox(child)
                            }
                            else if (child.userData.type === 'trimesh') {
                                this.createTrimesh(child)
                            }

                            child.visible = false;
                        }
                    }
                }
                else {

                    if (child.isMesh) {
                        child.castShadow = false;
                        child.receiveShadow = true;
                        child.material.roughness = 1;
                    } else {
                        child.layers.disableAll();
                    }

                    this.scene.add(gltf.scene)
                }
            })
        })
    }

    private createBox(child: any): void {
        let phys = new BoxCollider(child, {
            material: this.materials.worldFloorMaterial
        })

        this.physics.addBody(phys.body);
    }

    private createTrimesh(child: any): void {
        let phys = new TrimeshCollider(child, {
            material: this.materials.worldFloorMaterial
        })

        this.physics.addBody(phys.body);
    }

    private addGui() {
        const lightFolder = this.gui?.addFolder('Light')
        lightFolder?.add(this.light.pointLight, 'intensity', 0, 20).name("PointIntensity")
        lightFolder?.add(this.light.ambientLight, 'intensity', 0, 20).name("AmbientIntensity")
        lightFolder?.add(this.light.pointLight, 'castShadow')
        lightFolder?.open()
    }

    public RemoveGameCanvas() {
        console.log("removing game canvas")
        // this.scene.clear()
    }

}



