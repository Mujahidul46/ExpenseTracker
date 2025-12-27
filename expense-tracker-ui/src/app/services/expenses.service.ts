import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Expense } from "../interfaces/Expense";
import { Injectable } from "@angular/core";
import { baseApiUrl } from "../../environment";

@Injectable({providedIn: 'root'})
export class ExpenseService {
    constructor(private http: HttpClient) {}

    public getExpenses(userId: number): Observable<Expense[]> {
        return this.http.get<Expense[]>(`${baseApiUrl}/expenses/users/1`); // hardcoded to 1
    }

    
}

