import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-create-expense-modal',
	imports: [FormsModule],
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Create Expense</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">

			<div class="mb-3">
				<label class="form-label">Name:</label>
				<input type="text" class="form-control" [(ngModel)]="expense.name">
			</div>

			<div class="mb-3">
				<label class="form-label">Amount:</label>
				<input type="text" class="form-control" [(ngModel)]="expense.amount">
			</div>
		</div>
		<div class="modal-footer">
			<button class="btn btn-outline-secondary" (click)="activeModal.dismiss()">Cancel</button>
			<button class="btn btn-outline-secondary" (click)="activeModal.close(expense)">Create</button>
		</div>
	`,
})
export class CreateExpenseModalComponent {
	activeModal = inject(NgbActiveModal);

	expense = {
		name: '',
		amount: 0,
		categoryId: 0,
		userId: Number(localStorage.getItem('userId')),
	}
}
