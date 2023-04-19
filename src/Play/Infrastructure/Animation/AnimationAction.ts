import * as THREE from "three";
import { AnimationType } from "./AnimationType";

const fadeDuration = 0.3;

export default class AnimationAction 
{
    public animationType: AnimationType;
    private animation: THREE.AnimationAction;
    private clip: THREE.AnimationClip;
    private syncAnimation: AnimationAction[] = new Array<AnimationAction>();
    private isEnable: boolean;

    constructor(animationType: AnimationType, animation: THREE.AnimationAction, clip: THREE.AnimationClip, isEnable: boolean = false) 
    {
        this.animationType = animationType;
        this.animation = animation;
        this.clip = clip;
        this.isEnable = isEnable;
        if (isEnable) 
        {
            this.animation.play();
        }
    }

    public setSync(...animations: AnimationAction[]) 
    {
        for (let i = 0; i < animations.length; i++) 
        {
            this.syncAnimation.push(animations[i]);
        }
    }

    public enable(signal: boolean, timeScale: number = 1) 
    {
        if (signal && !this.isEnable) 
        {
            this.animation.reset()
            for (let i = 0; i < this.syncAnimation.length; i++) 
            {
                if (this.syncAnimation[i].animation && this.syncAnimation[i].isEnable) 
                {
                    if (timeScale < 0)
                        this.animation.time = this.clip.duration - this.syncAnimation[i].animation!.time
                    else
                        this.animation.syncWith(this.syncAnimation[i].animation!);
                }
            }
            this.animation.timeScale = timeScale
            this.animation.fadeIn(fadeDuration).play();
            this.isEnable = true;
        }
        else if (!signal && this.isEnable) 
        {
            this.animation.fadeOut(fadeDuration);
            this.isEnable = false;
        }
    }

    public enableOneLoop() {
        if (this.animation.time === 0 || this.animation.time === this.clip.duration)
        {
            this.animation.setLoop(THREE.LoopOnce, 1);
            this.animation.weight = 2;
            this.animation.timeScale = 1;
            this.animation.reset().fadeIn(fadeDuration).play();
        }
    }

    public cancel() {
        this.animation.stop();
    }
}