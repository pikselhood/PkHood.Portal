import * as THREE from "three";

export default class ClickableBox {

    public object: THREE.Group;
    public primaryBoxObject: THREE.Mesh;
    public secondaryBoxObject: THREE.Mesh;

    public constructor(){

        const smallBox = new THREE.BoxGeometry(1,2,1);
        const bigBox = new THREE.BoxGeometry(3,3,3);

        this.primaryBoxObject = new THREE.Mesh(smallBox);
        this.secondaryBoxObject = new THREE.Mesh(bigBox);

        this.primaryBoxObject.name = 'PrimaryBox';
        this.secondaryBoxObject.name = 'SecondaryBox';;

        this.primaryBoxObject.visible = false;
        this.secondaryBoxObject.visible = false;

        this.object = new THREE.Group();
        this.object.add(this.primaryBoxObject);
        this.object.add(this.secondaryBoxObject);
    }

}