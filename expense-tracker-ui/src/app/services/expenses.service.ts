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

    public deleteExpense(expenseId: number): Observable<void> {
        return this.http.delete<void>(`${baseApiUrl}/expenses/${expenseId}`);
        //return this.http.delete<void>(`${baseApiUrl}/expenses/50032324`); // simulate failure

    }

    public createExpense(expense : Expense) : Observable<Expense> {
        return this.http.post<Expense>(`${baseApiUrl}/expenses`, expense);
    }

    public updateExpense(expenseId: number, expense: Partial<Expense>) : Observable<Expense> {
        return this.http.put<Expense>(`${baseApiUrl}/expenses/${expenseId}`, expense);
    }
}

