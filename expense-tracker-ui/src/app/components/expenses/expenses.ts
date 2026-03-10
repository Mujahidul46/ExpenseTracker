import { Component } from '@angular/core';
import { Expense } from '../../interfaces/Expense';
import { ExpenseService } from '../../services/expenses.service';
import { AuthService } from '../../services/auth.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-expenses',
  imports: [DecimalPipe],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',
})
export class Expenses {
  userId! : number;
  expenses : Expense[] = [];
  totalExpense: number = 0;

  constructor (
    private authService : AuthService,
    private expenseService: ExpenseService
  ) {

  }
  ngOnInit() {
      
      this.userId = this.authService.getCurrentUserId();
      this.expenseService.getExpenses(this.userId).subscribe({ // Add extra date parameter here when implemented
        next: (data) => { this.expenses = data;
        this.getTotalExpense();
        
        },
        error: (err) => console.error(err),
      });
    }

    getTotalExpense() {
      let total = 0;
      for (let expense of this.expenses) {
        total += expense.amount;
      }
      this.totalExpense = total;
    }
}
