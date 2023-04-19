import * as THREE from "three";
import AnimationAction from "../../Infrastructure/Animation/AnimationAction";
import { AnimationType } from "../../Infrastructure/Animation/AnimationType";
import Signals from "../../Infrastructure/Signals/Signals";
import LoaderHelper from "../../Infrastructure/Utils/Helper/LoaderHelper";

export interface CharacterAnimationType 
{
    idleActionUrl: string;
    walkActionUrl: string;
    backwardActionUrl: string;
    jumpActionUrl: string;
    sideWalkLActionUrl: string;
    sideWalkRActionUrl: string;
    skillActions: [{type: number, url: string}];
}

export default class CharacterAnimation
{
    public mixer: THREE.AnimationMixer;

    public idleAction?: AnimationAction;
    public walkAction?: AnimationAction;
    public backwardAction?: AnimationAction;
    public jumpAction?: AnimationAction;
    public sideWalkLAction?: AnimationAction;
    public sideWalkRAction?: AnimationAction;

    public skillActions = [] as AnimationAction[];

    private animationLoadCount: number = 0;
    private animationTotalCount: number;

    constructor(model: THREE.Group, type: CharacterAnimationType) 
    {
        this.animationTotalCount = 6 + type.skillActions.length;
        this.mixer = new THREE.AnimationMixer(model);

        LoaderHelper.loadFBX(type.idleActionUrl,
            (object) => 
            {
                this.idleAction = new AnimationAction(AnimationType.Idle, this.mixer.clipAction(object.animations[0]), object.animations[0], true)
                this.animationLoad(1)
            });
        LoaderHelper.loadFBX(type.jumpActionUrl,
            (object) => 
            {
                this.jumpAction = new AnimationAction(AnimationType.Jump, this.mixer.clipAction(object.animations[0]), object.animations[0])
                this.animationLoad(1)
            });
        LoaderHelper.loadFBX(type.walkActionUrl,
            (object) => 
            {
                this.walkAction = new AnimationAction(AnimationType.Walk, this.mixer.clipAction(object.animations[0]), object.animations[0])
                this.animationLoad(1)
            });
        LoaderHelper.loadFBX(type.backwardActionUrl,
            (object) => 
            {
                this.backwardAction = new AnimationAction(AnimationType.Backward, this.mixer.clipAction(object.animations[0]), object.animations[0])
                this.animationLoad(1)
            });
        LoaderHelper.loadFBX(type.sideWalkLActionUrl,
            (object) => 
            {
                this.sideWalkLAction = new AnimationAction(AnimationType.SideWalkL, this.mixer.clipAction(object.animations[0]), object.animations[0])
                this.animationLoad(1)
            });
        LoaderHelper.loadFBX(type.sideWalkRActionUrl,
            (object) => 
            {
                this.sideWalkRAction = new AnimationAction(AnimationType.SideWalkR, this.mixer.clipAction(object.animations[0]), object.animations[0])
                this.animationLoad(1)
            });
        for (let skillAction of type.skillActions)
        {
            LoaderHelper.loadFBX(skillAction.url,
                (object) => 
                {
                    const basicAttackAction = new AnimationAction(skillAction.type, this.mixer.clipAction(object.animations[0]), object.animations[0])
                    this.skillActions?.push(basicAttackAction)
                    this.animationLoad(1)
                });
        }
    }

    public _Animate(delta: number, signals: Signals)
    {
        this.mixer?.update(delta);

        this.animateJump(signals)
        this.animateMove(signals)
    }
    
    public animate(animationType?: AnimationType)
    {
        this.skillActions?.find(x => x.animationType === animationType)?.enableOneLoop();
    }

    public cancel(animationType?: AnimationType)
    {
        this.skillActions?.find(x => x.animationType === animationType)?.cancel();
    }

    private animateJump(signals: Signals)
    {
        if (signals.onGround && signals.jumpSignal.jump)
        {
            this.jumpAction?.enableOneLoop();
        }
    }

    private animateMove(signals: Signals)
    {
        if (!signals.moveSignal.isChange()) return;

        this.idleAction?.enable(!signals.moveSignal.anyMove());
        this.walkAction?.enable(signals.moveSignal.forward && !signals.moveSignal.backward);

        this.backwardAction?.enable(
            signals.moveSignal.backward && !signals.moveSignal.forward
        );

        if (signals.moveSignal.backward) 
        {
            this.sideWalkLAction?.enable(
                signals.moveSignal.right && !signals.moveSignal.left,
                -1
            );
            this.sideWalkRAction?.enable(
                signals.moveSignal.left && !signals.moveSignal.right,
                -1
            );
        } else 
        {
            this.sideWalkLAction?.enable(
                signals.moveSignal.left && !signals.moveSignal.right
            );
            this.sideWalkRAction?.enable(
                signals.moveSignal.right && !signals.moveSignal.left
            );
        }  
    }

    private animationLoad(i: number) 
    {
        this.animationLoadCount += i;
        if (this.animationLoadCount === this.animationTotalCount) {
            this.initAnimationSettings()
        }
    }

    private initAnimationSettings() 
    {
        if(!this.walkAction || !this.jumpAction || !this.backwardAction || !this.sideWalkLAction || !this.sideWalkRAction) 
            return;

        this.walkAction.setSync(this.sideWalkLAction, this.sideWalkRAction)

        this.backwardAction.setSync(this.sideWalkLAction, this.sideWalkRAction)

        this.sideWalkLAction.setSync(this.walkAction, this.backwardAction)

        this.sideWalkRAction.setSync(this.walkAction, this.backwardAction)
    }

}