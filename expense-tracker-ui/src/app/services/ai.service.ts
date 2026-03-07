import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, timeout, catchError, of } from "rxjs";
import { baseApiUrl } from "../../environment";

@Injectable({providedIn: 'root'})
export class AiService {
    constructor(private http: HttpClient) {

    }

    public getSugggestedCategory(expenseName: string): Observable<any> {
        return this.http.post(`${baseApiUrl}/ai/suggest-category`, {
            expenseName: expenseName
        }).pipe(
            timeout(30000), // 30 second timeout
            catchError(error => {
                console.error('AI suggestion failed or timed out:', error);
                return of({ suggestedCategory: 'Other', confidence: 0 });
            })
        );
    }

}