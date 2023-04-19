import StyleHelper from "../../Infrastructure/Utils/Helper/StyleHelper";

export default class HpBar 
{
    public div: HTMLDivElement;
    private healthDiv: HTMLDivElement;
    private animationDiv: HTMLDivElement;

    private percent: number;

    public constructor(percent: number) 
    {
        this.percent = 100;

        StyleHelper.AddStyle(`
            #hpBar {
                height: 8px;
                width: 100%;
                background-color: #b6b2b2;
                border-radius: 15px; 
            }
            
            #hpBarHealth {
                height: 8px;
                text-align: center;
                line-height: 30px;
                position: relative;
            }
        `)

        this.div = document.createElement('div');
        this.div.id = 'hpBar';

        this.animationDiv = document.createElement('div');
        this.animationDiv.id = 'hpBarHealth';
        this.animationDiv.style.borderRadius = '15px 15px 15px 15px';
        this.animationDiv.style.backgroundColor = 'yellow';

        this.healthDiv = document.createElement('div');
        this.healthDiv.id = 'hpBarHealth';
        this.healthDiv.style.borderRadius = '15px 15px 15px 15px';
        this.healthDiv.style.backgroundColor = 'red';
        this.healthDiv.style.top = '-8px';


        this.div.appendChild(this.animationDiv);
        this.div.appendChild(this.healthDiv);

        this.update(percent);
    }

    public update(percent: number)
    {
        var oldPercent = this.percent;
        this.percent = percent;

        this.healthDiv.style.width = `${this.percent}%`;

        if (this.percent - oldPercent < -5)
        {
            this.animate(oldPercent, percent);
        }

        if(this.percent >= 98 && this.healthDiv.style.borderRadius === '15px 0px 0px 15px')
        {
            this.healthDiv.style.borderRadius = '15px 15px 15px 15px';
        }
        else if(this.percent < 98 && this.healthDiv.style.borderRadius !== '15px 0px 0px 15px')
        {
            this.healthDiv.style.borderRadius = '15px 0px 0px 15px';
        }
    }

    private animate(oldPercent: number, newPercent: number)
    {
        const tick = 10;
        var change = (newPercent - oldPercent) / tick;
        var percent = oldPercent;
        window.setTimeout(() => 
        {
            var interval = window.setInterval(() => 
            {
                percent = percent + change;
                this.animationDiv.style.width = `${percent}%`;

                if(percent <= newPercent)
                {
                    clearInterval(interval)
                }
            }, 10)
        }, 300);
    }

}