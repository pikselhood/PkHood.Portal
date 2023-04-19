import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";

export default class Render 
{
    public renderer: THREE.WebGLRenderer;
    public labelRenderer: CSS2DRenderer;

    public constructor() 
    {
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.domElement.id = 'webGLCanvas';
        this.renderer.shadowMap.enabled = true;

        this.labelRenderer = new CSS2DRenderer();
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.labelRenderer.domElement);
        this.labelRenderer.domElement.id = 'cssCanvas';
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0px';
        this.labelRenderer.domElement.className = "text-sprite";
    }

    public _Update(scene: THREE.Scene, camera: THREE.Camera) 
    {
        this.labelRenderer.render(scene, camera);
        this.renderer.render(scene, camera);
    }

    public OnWindowResize() 
    {
        this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}