import { Verification } from "../Connection/ResponseData/Models/ConnectionModels";
import WebSocketClient from "../Connection/WebSocketClient";
import { UserObj } from "../Infrastructure/Types/Connection/UserObject";
import Options from "../Options";
import InputController from "./InputController";
import SocketController from "./SocketController";
import World from "../Infrastructure/World/World";
import UserManager from "../Manager/UserManager";
import PlayersManager from "../Manager/PlayersManager";
import Hud from "./Hud";

export default class Game {
    public world: World;
    public socket: WebSocketClient;
    public inputController: InputController | undefined;
    public socketController: SocketController | undefined;
    public userManager: UserManager;
    public playersManager: PlayersManager;

    constructor(hud: Hud) {
        this.socket = new WebSocketClient(
            Options.WEB_SOCKET_SERVER_IP,
            Options.WEB_SOCKET_SERVER_PORT,
            this.webSocketOnOpen
        );
        this.world = new World(hud);
        this.playersManager = new PlayersManager(this.world);
        this.userManager = new UserManager(this.world, this.socket, this.playersManager);
    }

    public _Update(delta: number) {
        this.userManager._Update(delta);

        this.playersManager._Update(delta);

        this.world._Update(delta);
    }

    private webSocketOnOpen = () => {
        this.inputController = new InputController(this.userManager);
        this.socketController = new SocketController(this.socket, this.userManager, this.playersManager);
        this.verify();
    }

    private verify() {
        const userObj = this.readLocalStorage();

        const verification = new Verification();
        verification.pToken = userObj.pToken;
        verification.characterId = userObj.characterId;

        this.socket.WriteData(verification);
    }

    private readLocalStorage() {
        const pToken = window.localStorage.getItem("p_token") || "";
        const characterId = window.localStorage.getItem("characterId") || "";

        if (!(pToken && characterId)) {
            window.location.replace(Options.HOME_PAGE);
        }

        return { pToken, characterId } as UserObj;
    }

}