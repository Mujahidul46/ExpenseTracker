import { Component, OnInit, TemplateRef } from '@angular/core';
import { Expense } from '../../interfaces/Expense';
import { ExpenseService } from '../../services/expenses.service';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast-service';
import { ToastsContainer } from '../../shared/toasts-container/toasts-container';
import { InputModalComponent } from '../../shared/input-modals/create-expense-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';

@Component({
  selector: 'app-user-dashboard',
  imports: [ConfirmationModalComponent, NgbToast, ToastsContainer],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  constructor (
    private expenseService : ExpenseService,
    private toastService : ToastService,
    private modalService : NgbModal)
  {
  };

    expenses : Expense[] = [];
    expenseToDelete: Expense | null = null;
    expenseName: string = '';
    showDeleteModal: boolean = false;
    showToastMsg : boolean = false;
    
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

    deleteExpense(expenseId: number, successTemplate: TemplateRef<any>, failureTemplate: TemplateRef<any>) {
      this.expenseName = this.expenseToDelete?.name || '';
      this.expenseService.deleteExpense(expenseId).subscribe({
        next: () => {
          this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
          this.closeDeleteModal();
          this.toastService.show({
            template: successTemplate,
            classname: 'bg-success text-light',
            delay: 5000,
          });
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toastService.show({
            template: failureTemplate,
            classname: 'bg-danger text-light',
            delay: 5000,
          });
      }});
    }

    openCreateModal() {
      const modalRef = this.modalService.open(InputModalComponent);

      modalRef.result.then((expense) => {
        this.expenseService.createExpense(expense).subscribe({
          next: (createdExpense) => {
            this.expenses.push(createdExpense);
          },
          error: (err) => {
            console.error('Create expense failed', err);
          }
        });
      });

    }
  }
