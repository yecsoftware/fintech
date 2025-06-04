export class BaseMessage {
    
    private _items: any ;

    public set ItemsProxy(value: any){
        this._items = value;
    }
    public get ItemsProxy(){
        return this._items;
    }

    constructor() {
        this.ItemsProxy = {};
    }
}