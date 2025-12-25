import { Component, OnInit } from '@angular/core';
import { Expense } from '../../interfaces/Expense';
import { ExpenseService } from '../../services/expenses.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  constructor (private expenseService : ExpenseService){
      };

    expenses : Expense[] = [];
    
    ngOnInit() {
      this.expenseService.getExpenses(1).subscribe({
        next: (data) => this.expenses = data,
        error: (err) => console.error(err),
      });
    }
}
