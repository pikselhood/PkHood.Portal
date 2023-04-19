import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import HpBar from "./HpBar";

export default class Header {

    public nameElement: HTMLParagraphElement;
    public levelElement: HTMLSpanElement;
    public hpBar: HpBar;
    public castBar: HTMLProgressElement;

    public object: CSS2DObject;

    public constructor(name: string, health: number, maxHealth: number, level: number) {
        const div = document.createElement('div');
        div.className = 'header';
        div.style.lineHeight = '0px';
        div.style.textAlign = 'center';

        this.nameElement = document.createElement('p');
        this.nameElement.textContent = name;
        this.nameElement.style.fontSize = '16px';
        this.nameElement.style.color = '#ffffff';

        const divHpAndLevel = document.createElement('div');
        divHpAndLevel.style.display = 'flex';

        var percent = 100 * health / maxHealth;
        if(percent <= 0) 
        {
            percent = 0;
        }
        this.hpBar = new HpBar(percent);

        this.hpBar.div.style.flex = '9';
        divHpAndLevel.appendChild(this.hpBar.div);

        this.levelElement = document.createElement('span');
        this.levelElement.textContent = level.toString();
        this.levelElement.style.flex = '1';
        this.levelElement.style.margin = 'auto';
        this.levelElement.style.fontSize = '15px';
        this.levelElement.style.color = '#ffffff';
        divHpAndLevel.appendChild(this.levelElement);

        this.castBar = document.createElement('progress');
        this.castBar.max = 1000;
        this.castBar.value = 0;
        this.castBar.style.height = '5px';
        this.castBar.style.marginTop = '5px';
        this.castBar.style.background = 'black';

        div.appendChild(this.nameElement);
        div.appendChild(divHpAndLevel);
        div.appendChild(this.castBar);

        this.object = new CSS2DObject(div);
        this.object.name = "Header"
    }

}