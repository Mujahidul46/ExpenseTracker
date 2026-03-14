// Rebuild trigger: March 14 2026
import { Component, OnInit } from '@angular/core';
import { Expense } from '../../interfaces/Expense';
import { ExpenseService } from '../../services/expenses.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-expenses',
  imports: [DecimalPipe, DatePipe],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',
})
export class Expenses implements OnInit {
  userId! : number;
  expenses : Expense[] = [];
  totalExpense: number = 0;
  currentDate: Date = new Date();

  constructor (
    private authService : AuthService,
    private expenseService: ExpenseService
  ) {

  }
  ngOnInit() {
      this.userId = this.authService.getCurrentUserId();
      this.expenseService.getExpenses(this.userId).subscribe({
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

    getExpensesForDate(previousOrNextDay: string) {
      this.expenses = [];
      if (previousOrNextDay === 'previousDay') {
        this.currentDate.setDate(this.currentDate.getDate() - 1);
      } else if (previousOrNextDay === 'nextDay') {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
      }

      this.currentDate = new Date(this.currentDate);

      this.expenseService.getExpenses(this.userId, this.currentDate).subscribe({
        next: (data) => { this.expenses = data;
        this.getTotalExpense();
        },
        error: (err) => console.error(err),
      });
    }

    isToday(): boolean {
      const today = new Date();
      return (this.currentDate.toDateString() === today.toDateString());
    }
}
