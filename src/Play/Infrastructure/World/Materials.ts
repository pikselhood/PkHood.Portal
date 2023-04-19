import * as CANNON from "cannon-es";
export default class Materials 
{
    public characterMaterial: CANNON.Material = new CANNON.Material("WorldFloorMaterial");
    public worldFloorMaterial: CANNON.Material = new CANNON.Material("CharacterMaterial");

    public constructor(physics: CANNON.World)
    {
        physics.addContactMaterial(
            new CANNON.ContactMaterial(this.worldFloorMaterial, this.characterMaterial, { friction: 0, restitution: 0})
        )

        physics.addContactMaterial(
            new CANNON.ContactMaterial(this.characterMaterial, this.characterMaterial, { friction: 0, restitution: 0})
        )
    }
    
}

