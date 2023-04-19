
export interface IMoveState {
    characterId: string;
    moveState: string;
}

export interface IJumpState {
    characterId: string;
    jumpState: number;
}

export interface ISkillState {
    characterId: string;
    targetCharacterId: string;
    skillState: number;
}
