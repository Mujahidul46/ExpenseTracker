import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Expense } from "../interfaces/Expense";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ExpenseService {
    constructor(private http: HttpClient) {}
    private apiUrl = 'https://localhost:7048/expenses';
    public getExpenses(userId: number): Observable<Expense[]> {
        return this.http.get<Expense[]>(`${this.apiUrl}/users/1`); // hardcoded to 1
    }
}

