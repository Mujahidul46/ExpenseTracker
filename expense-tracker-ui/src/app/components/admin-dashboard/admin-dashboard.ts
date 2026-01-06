import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expenses.service';
import { UserExpense } from '../../interfaces/UserExpense';
import { AdminService } from '../../services/admin.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboardComponent implements OnInit {
  constructor (private expenseService : ExpenseService,
    private adminService : AdminService,
  ){
    };

    expenses : UserExpense[] = [];
    users : User[] = [];
    
    ngOnInit() {
      this.adminService.getAllExpensesFromAllUsers().subscribe({
        next: (data) => this.expenses = data,
        error: (err) => console.error(err),
      });

      this.adminService.getAllUsers().subscribe({
        next: (data) => this.users = data,
        error: (err) => console.error(err),
      })
    }
}
