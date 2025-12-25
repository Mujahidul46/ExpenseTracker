import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Expense } from "../interfaces/Expense";
import { AdminExpense } from "../interfaces/AdminExpense";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ExpenseService {
    constructor(private http: HttpClient) {}
    private baseUrl = 'https://localhost:7048/expenses';

    public getExpenses(userId: number): Observable<Expense[]> {
        return this.http.get<Expense[]>(`${this.baseUrl}/users/1`); // hardcoded to 1
    }

    public getAllExpensesFromAllUsers(): Observable<AdminExpense[]> {
        return this.http.get<AdminExpense[]>('https://localhost:7048/api/admin/all-expenses');
    }
}

