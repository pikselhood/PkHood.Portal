import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import User from "../../Entity/User";
import Options from "../../Options";
import Render from "./Render";

export default class Camera 
{
    public perspectiveCamera: THREE.PerspectiveCamera;
    public controls: OrbitControls;
    private render: Render;

    public constructor(render: Render) 
    {
        this.render = render;
        this.perspectiveCamera = new THREE.PerspectiveCamera(Options.CAMERA_FOV, window.innerWidth / window.innerHeight, 0.1, Options.CAMERA_FAR);
        this.controls = new OrbitControls(this.perspectiveCamera, render.labelRenderer.domElement);
        
        //resize window
        window.addEventListener(
            "resize",
            this.OnWindowResize,
            false
        );
        
        this.controlsSettings();
    }

    public OnWindowResize = () => 
    {
            this.perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
            this.perspectiveCamera.updateProjectionMatrix();
            this.render.OnWindowResize();
    }
    
    private controlsSettings() 
    {
        this.controls.minDistance = 10
        this.controls.maxDistance = 25
        this.controls.minPolarAngle = Math.PI / 4
        this.controls.maxPolarAngle = Math.PI / 2.1
        this.controls.rotateSpeed = 0.2
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.2
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE
        }
    }

    public _Update(delta: number, user: User, aim: THREE.Vector3)
    {
        this._Move(delta, user);
        this._Rotate(aim);
    }

    public _Move(delta: number, user: User)
    {
        const cPosition = this.perspectiveCamera.position;
        this.perspectiveCamera.position.set(
            cPosition.x + user.character.characterPhysics.body.velocity.x * delta,
            cPosition.y + user.character.characterPhysics.body.velocity.y * delta,
            cPosition.z + user.character.characterPhysics.body.velocity.z * delta
        );

    }

    public _Rotate(aim: THREE.Vector3) 
    {
        this.controls.target.set(aim.x, aim.y, aim.z)
        this.controls.update();
    }

    public hasTarget() 
    {
        if(this.controls.target.x && this.controls.target.y && this.controls.target.z) 
        {
            return true;
        }   
        return false;
    }

}