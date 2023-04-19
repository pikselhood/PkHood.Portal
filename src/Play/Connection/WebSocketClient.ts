import Options from "../Options";
import ReceivedInput from "./ReceivedInput/ReceivedInput";
import ResponseData from "./ResponseData/ResponseData";

export default class WebSocketClient {

    public receivedInput: ReceivedInput = new ReceivedInput();
    private responseData: ResponseData = new ResponseData();
    private client: WebSocket;
    private onOpen: () => void

    constructor(ip: string, port: number, onOpen: () => void) {
        this.client = new WebSocket(ip + ":" + port)
        this.onOpen = onOpen;
        this._Init();
    }

    private _Init() {

        this.client.onopen = (event) => {
            this.onOpen();
        };

        this.client.onmessage = (event) => {
            this.receivedInput.NewInput(JSON.parse(event.data));
        };

    }

    public WriteData(data: any) {

        const responseData = this.responseData.GetData(data);

        if (this.client.readyState === 3) {
            //readyState 3 means websocket is closed. refer to https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState
            window.location.replace(Options.HOME_PAGE);
        }
        if (this.client.readyState === 1 && responseData) {
            this.client.send(
                JSON.stringify(responseData)
            );
        }


    }

}




