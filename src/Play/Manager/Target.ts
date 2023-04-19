import * as THREE from "three";
import Character from "../Entity/Character/Character";
import PlayersManager from "./PlayersManager";
import UserManager from "./UserManager";

export default class Target 
{
    public character?: Character;
    public cube?: THREE.Mesh;
    
    private userManager: UserManager;
    private playersManager: PlayersManager;

    constructor(userManager: UserManager, playersManager: PlayersManager)
    {
        this.userManager = userManager;
        this.playersManager = playersManager;
    }

    public TryChangeTarget(newObject: THREE.Object3D | null | undefined): boolean 
    {
        var oldObject = this.character?.characterObject.object
        if (newObject !== oldObject) 
        {
            if (newObject) 
            {
                this.character?.characterObject.deselect();
                
                this.character = this.findCharacterById(newObject.uuid);

                this.character?.characterObject.select();

                return true;
            }
        }
        return false;
    }

    private findCharacterById(id: string)
    {
        return this.playersManager.findCharacterById(id);        
    }

}