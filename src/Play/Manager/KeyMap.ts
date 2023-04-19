import { DSignal } from "../Infrastructure/Signals/DigitSignal";

export default class KeyMap {

    
    public digitsToSkillIdMap: {[DSignal: number]: number; } = {};

    constructor(characterClass: string) 
    {
        switch (characterClass) 
        {
            case "warrior":
                this.digitsToSkillIdMap[DSignal.Digit1] = 1;
                break;
            case "archer":
                this.digitsToSkillIdMap[DSignal.Digit1] = 2;
                break;
            case "mage":
                this.digitsToSkillIdMap[DSignal.Digit1] = 3;
                break;
            case "healer":
                this.digitsToSkillIdMap[DSignal.Digit1] = 4;
                break;
        }
    }
}