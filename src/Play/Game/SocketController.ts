import { IAddCharacter, IClientCharacter } from "../Connection/ReceivedInput/Types/ConnectionTypes";
import WebSocketClient from "../Connection/WebSocketClient";
import PlayersManager from "../Manager/PlayersManager";
import UserManager from "../Manager/UserManager";

export default class SocketController 
{
    private playersManager: PlayersManager;
    private userManager: UserManager;
    private socket: WebSocketClient;

    public constructor(socket: WebSocketClient, userManager: UserManager, playersManager: PlayersManager) 
    {
        this.playersManager = playersManager;
        this.userManager = userManager;
        this.socket = socket;
        
        socket.receivedInput.userCharacter.push(this.setUser);
        
        socket.receivedInput.activeCharacters.push(this.playersManager.initCharacters);
        socket.receivedInput.addCharacter.push(this.playersManager.addCharacter);
        socket.receivedInput.deleteCharacter.push(this.playersManager.deleteCharacter);
        socket.receivedInput.moveState.push(this.playersManager.moveStateUpdate);
        socket.receivedInput.jumpState.push(this.playersManager.jumpStateUpdate);
        socket.receivedInput.skillState.push(this.playersManager.skillStateUpdate);
        socket.receivedInput.quaternion.push(this.playersManager.quaternionUpdate);
        socket.receivedInput.position.push(this.playersManager.positionUpdate);

        socket.receivedInput.characterHealth.push(this.playersManager.currentHealthUpdate);
        socket.receivedInput.characterHealth.push(this.userManager.updateHud);
    }

    private setUser = (clientCharacter: IClientCharacter) =>
    {
        const userCharacter = clientCharacter.userCharacter;
        const newCharacter: IAddCharacter = 
            {
                character:  
                {
                    id: userCharacter.id, 
                    name: userCharacter.name,
                    class: userCharacter.class,
                    position: userCharacter.position,
                    quaternion: userCharacter.quaternion,
                    maxHealth: userCharacter.stats.maxHealth,
                    maxMana: userCharacter.stats.maxMana,
                    health: userCharacter.health,
                    mana: userCharacter.mana,
                }
            };
        const character = this.playersManager.addCharacter(newCharacter);

        this.userManager.setUser(clientCharacter.userCharacter, character);
    }

}
