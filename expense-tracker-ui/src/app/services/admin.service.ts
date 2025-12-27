import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { UserExpense } from "../interfaces/UserExpense";
import { baseApiUrl } from "../../environment";
import { User } from "../interfaces/User";

@Injectable({providedIn: 'root'})
export class AdminService {
    constructor(private http: HttpClient) {}

    public getAllExpensesFromAllUsers(): Observable<UserExpense[]> {
        return this.http.get<UserExpense[]>(`${baseApiUrl}/admin/all-expenses`);
    }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${baseApiUrl}/admin/users`);
    }
}