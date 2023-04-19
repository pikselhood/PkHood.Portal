import * as THREE from "three";
import World from "../Infrastructure/World/World";

export default class ClickManager 
{
    public Raycaster: THREE.Raycaster;
    public IntersectedObj: any;
    private world: World;

    constructor(world: World) 
    {
        this.world = world;
        this.Raycaster = new THREE.Raycaster();
    }

    public GetTarget(event: any): THREE.Object3D | null | undefined
    {
        event.preventDefault();

        const mouse = new THREE.Vector2(
            ( event.clientX / window.innerWidth ) * 2 - 1,
            - ( event.clientY / window.innerHeight ) * 2 + 1
        );

        this.Raycaster.setFromCamera( mouse, this.world.camera.perspectiveCamera );
        
        let intersects = this.Raycaster.intersectObjects( this.world.scene.children.filter(x => x.name = 'CharacterModel'), true );

        if ( intersects.length > 0 ) 
        {
            intersects = intersects.filter(x => x.object.name === 'SecondaryBox');

            if(intersects.length > 0 ) 
            {
                let nearestCharacterMesh = intersects[0];
                let nearestCharacterBase = nearestCharacterMesh.object.parent?.parent;
                //let nearestCharacterBase = nearestCharacter?.parent;

                return nearestCharacterBase;
            }

        } 
        else 
        {
            this.IntersectedObj = null;
        }
    }


}
