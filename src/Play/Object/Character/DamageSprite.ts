import * as THREE from "three";
import TextSpriteHelper from "../../Infrastructure/Utils/Helper/TextSpriteHelper";

export default class DamageSprite
{
    public object: THREE.Group;

    constructor()
    {
        this.object = new THREE.Group();
    }
    
    public newDamageSprite(damage: number, percentage: number)
    {
        const text = TextSpriteHelper.createTextSprite(damage.toFixed(0));
        if(text) 
        {
            this.scale(text, percentage);
            this.object.add(text);
            var i = 1;
            var direction = Math.random() > 0.5 ? true : false;
            var sign = Math.random() > 0.5 ? true : false;
            var interval = window.setInterval(() => {
                i += 0.1;

                text.position.setY(this.verticalFunc(i));

                const h = (sign ? this.horizontalFunc(i) : -1*this.horizontalFunc(i));
                (direction ? 
                    text.position.setX(h): 
                    text.position.setZ(h));

                if(i >= 20)
                {
                    this.object.remove(text);
                    window.clearInterval(interval);
                }
            }, 10);
        }
    }
    
    private scale(text: THREE.Sprite, percentage: number)
    {
        var scale = 0.08*(percentage/25 + 1);
        if(percentage > 50)
        {
            scale = 0.08 * 3;
        }
        text.scale.set(scale, scale, scale);
    }

    private verticalFunc(x: number)
    {
        return -1 * (((x/7)-1.5)**2) + 2;
    }

    private horizontalFunc(x: number)
    {
        return 0.5/(1+Math.E**-(x-10));
    }
}