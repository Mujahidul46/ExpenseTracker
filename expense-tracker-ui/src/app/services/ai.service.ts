import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { baseApiUrl } from "../../environment";

@Injectable({providedIn: 'root'})
export class AiService {
    constructor(private http: HttpClient) {

    }

    public getSugggestedCategory(expenseName: string): Observable<any> {
        return this.http.post(`${baseApiUrl}/ai/suggest-category`, {
            expenseName: expenseName
        });
    }

}