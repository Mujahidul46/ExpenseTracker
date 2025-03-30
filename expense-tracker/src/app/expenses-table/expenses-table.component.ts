import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses-table',
  imports: [FormsModule],
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.scss'
})
export class ExpensesTableComponent {
  isModalOpen = false;
  newExpense = {
    date: '',
    description: '',
    category: '',
    amount: 0
  };

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addExpense() {
    console.log('New Expense:', this.newExpense);
    this.closeModal();
  }
}
