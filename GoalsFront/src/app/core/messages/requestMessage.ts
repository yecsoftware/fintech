import { BaseMessage } from "./baseMessage";

export class RequestMessage extends BaseMessage{
    
    public Add(type: string, data: any) {
        this.AddItem(type, data);
    }

    private AddItem(type: string, data: any){
        this["_items"][type] = data;
    }
}