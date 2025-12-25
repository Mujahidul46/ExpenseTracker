import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expenses.service';
import { AdminExpense } from '../../interfaces/AdminExpense';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  constructor (private expenseService : ExpenseService){
    };

    adminExpenses : AdminExpense[] = [];
    
    ngOnInit() {
      this.expenseService.getAllExpensesFromAllUsers().subscribe({
        next: (data) => this.adminExpenses = data,
        error: (err) => console.error(err),
      });
    }
}
