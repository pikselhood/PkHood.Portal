export interface Character {
    id: string;
    name: string;
    class: string;
}

export interface UserData {
    name: string;
    surname: string;
    email: string;
    characterList: Character[];
}
