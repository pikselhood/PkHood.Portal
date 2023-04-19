
export interface IUIState {
    onRemoveGame: () => void;
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    nameSkill1: string;
    cdSkill1: number;
}

export const emptyGeneralState: IUIState = {
    onRemoveGame: () => { },
    name: "Lorem Ipsum",
    level: 0,
    health: 100,
    maxHealth: 1000,
    mana: 100,
    maxMana: 1000,
    nameSkill1: "something",
    cdSkill1: 0,
}