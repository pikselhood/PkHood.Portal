import ICharacter from "../../Common/ICharacter";
import IUserCharacter from "../../Common/IUserCharacter";

export interface IClientCharacter {
    userCharacter: IUserCharacter;
}

export interface IActiveCharacters {
    characters: ICharacter[];
}

export interface IAddCharacter {
    character: ICharacter;
}

export interface IDeleteCharacter {
    characterId: string;
}
