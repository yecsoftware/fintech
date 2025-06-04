import { BaseMessage } from "./baseMessage";

export class ResponseMessage extends BaseMessage{

    AddItems(items: any){
        this.ItemsProxy = items;
    }

    GetList<T>(type: string) : T[]{
        const typeList = type.split(".");
        let prefixNamespace = typeList.slice(0, typeList.length - 2).join(".");
        let dllName = `System.Collections.Generic.List\`1[[${type}, ${prefixNamespace}, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]`
        return this.ItemsProxy[dllName] as T[];
    }


// Get<T>(type: string): T | null {

    
//   if (this.ItemsProxy[type]) {
//     return this.ItemsProxy[type] as T;
//   }


//   const typeList = type.split(".");
//   //if (typeList.length < 2) return null;

//   const prefixNamespace = typeList.slice(0, typeList.length - 2).join(".");
//   const dllName = `${type}, ${prefixNamespace}, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null`;

//   return this.ItemsProxy[dllName] as T ?? null;
// }


// Get<T>(type: string): T {
//     const typeList = type.split(".");
//     let prefixNamespace = typeList.slice(0, typeList.length - 2).join(".");
//     let dllName = `${type}, ${prefixNamespace}, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null`;
//     return this.ItemsProxy[dllName] as T;
// }




public Get<T>(type: string): T {
    // 1. Önce doğrudan type key’ini dene
    if (this.ItemsProxy[type]) {
        return this.ItemsProxy[type] as T;
    }

    // 2. dllName key’ini oluştur ve onu dene
    const typeList = type.split(".");
    let prefixNamespace = typeList.slice(0, typeList.length - 2).join(".");
    let dllName = `${type}, ${prefixNamespace}, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null`;

    if (this.ItemsProxy[dllName]) {
        return this.ItemsProxy[dllName] as T;
    }

    console.warn("Get<T>() couldn't find key:", type, "or", dllName);
    return undefined as any;
}
}