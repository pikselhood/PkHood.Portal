import * as THREE from "three";

export interface TextSpriteType
{
    fontFace: string;
    fontSize: number;
    textColor: {r: number, g: number, b: number, a: number};
    isBold: boolean;
    isRandomX: boolean;
    borderThickness: number;
    borderColor: {r: number, g: number, b: number, a: number};
    backgroundColor: {r: number, g: number, b: number, a: number};
}

export default class TextSpriteHelper
{
    public static createTextSprite( message: string, type?: TextSpriteType )
    {	
        var fontface = type?.fontFace ?? "Arial";
        var fontsize = type?.fontSize ?? 81;
        var textColor = type?.textColor ?? { r:238, g:224, b:0, a:1.0 };
        var isBold = type?.isBold ?? true;
        var isRandomX = type?.isBold ?? true;
        var borderThickness = type?.borderThickness ?? 4;
        var borderColor = type?.borderColor ?? { r:0, g:0, b:0, a:1.0 };
        var backgroundColor = type?.backgroundColor ?? { r:255, g:255, b:255, a:1.0 };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        if(!context) return null;
        context.font = (isBold ? "Bold " : "") + fontsize + "px " + fontface;
        
        // get size data (height depends only on font size)
        var metrics = context.measureText( message );
        var textWidth = metrics.width;
        
        // background color
        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                    + backgroundColor.b + "," + backgroundColor.a + ")";
        // border color
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                    + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        //this.roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
        // 1.4 is extra height factor for text below baseline: g,j,p,q.
        
        // text color
        context.fillStyle = "rgba(" + textColor.r + "," + textColor.g + ","
        + textColor.b + "," + textColor.a + ")";

        context.fillText( message, (isRandomX ? Math.random()*200 : 0), fontsize);
        
        // canvas contents will be used for a texture
        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial( { map: texture, sizeAttenuation: false } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(0.1,0.1,0.1);
        return sprite;
    }

    // function for drawing rounded rectangles
    private static roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) // roundArmor yapilacak
    {
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+r);
        ctx.lineTo(x+w, y+h-r);
        ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        ctx.lineTo(x+r, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-r);
        ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();   
    }
}