import { Component, OnInit } from '@angular/core';
import { Expense } from '../../interfaces/Expense';
import { ExpenseService } from '../../services/expenses.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-dashboard',
  imports: [ConfirmationModalComponent, NgbToast],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  constructor (private expenseService : ExpenseService)
  {
  };

    expenses : Expense[] = [];
    expenseToDelete: Expense | null = null;
    showDeleteModal: boolean = false;
    
    ngOnInit() {
      this.expenseService.getExpenses(1).subscribe({
        next: (data) => this.expenses = data,
        error: (err) => console.error(err),
      });
    }

    openDeleteModal(expense: Expense) {
      this.expenseToDelete = expense;
      this.showDeleteModal = true;
    }

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.expenseToDelete = null;
    }

    deleteExpense(expenseId: number) {
      //let expenseName = this.expenses.find(expense => expense.id == expenseId)?.name;
      // if(!confirm(`Are you sure you want to delete the "${expenseName}" expense?`)) {
      //   return;
      // }
      this.expenseService.deleteExpense(expenseId).subscribe({
        next: () => {
          this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
          this.closeDeleteModal();
          // add a call to show a success notification/toast here
        },
        error: (err) => console.error('Delete failed', err),
      });
    }
}
