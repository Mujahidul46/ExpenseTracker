import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Expense } from "../interfaces/Expense";
import { Injectable } from "@angular/core";
import { baseApiUrl } from "../../environment";

@Injectable({providedIn: 'root'})
export class ExpenseService {
    constructor(private http: HttpClient) {}

    public getExpenses(userId: number, date?: Date): Observable<Expense[]> {
        let url = `${baseApiUrl}/expenses/users/${userId}`;
        
        if (date) {
            let dateAsString = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
            url += `?date=${dateAsString}`;
        }

        return this.http.get<Expense[]>(url);
    }

    public deleteExpense(expenseId: number): Observable<void> {
        return this.http.delete<void>(`${baseApiUrl}/expenses/${expenseId}`);
    }

    public createExpense(expense : Expense) : Observable<Expense> {
        return this.http.post<Expense>(`${baseApiUrl}/expenses`, expense);
    }

    public updateExpense(expenseId: number, expense: Partial<Expense>) : Observable<Expense> {
        return this.http.put<Expense>(`${baseApiUrl}/expenses/${expenseId}`, expense);
    }
}

