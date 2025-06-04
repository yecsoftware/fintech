import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { RequestMessage } from "../core/messages/requestMessage";
import { ResponseMessage } from "../core/messages/responseMessage";
import { environment } from "../../environments/environment";



@Injectable({providedIn: 'root'})
export class HttpService {

    constructor(private http: HttpClient) { }

    public baseUrl: string = environment.apiUrl;



    public post<T>(operationName: string, data: RequestMessage): Observable<ResponseMessage>{
        const url = this.baseUrl + operationName;
        return this.http.post<ResponseMessage>(url, data).pipe(
            map((response: any) => {
                console.log('Response:', response);
                const responseData = new ResponseMessage();
                responseData.ItemsProxy = response["_items"];
                return responseData;
            })
        )
    }

    public getToken(body: {UserEmail:string, UserPassword:string}): Observable<any> {
        return this.http.post(this.baseUrl + 'User/getUserWithToken', body);
    }
}