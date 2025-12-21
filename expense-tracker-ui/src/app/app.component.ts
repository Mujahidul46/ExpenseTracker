import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseService } from './services/expenses.service';
import { Expense } from './interfaces/Expense';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
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
