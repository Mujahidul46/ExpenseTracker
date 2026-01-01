import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-update-expense-modal',
	imports: [FormsModule],
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Update Expense</h4>
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

			<div class="mb-3">
				<label class="form-label">Category:</label>
				<select class="form-select" [(ngModel)]="expense.categoryId">
					<option [ngValue]="1">Food</option>
					<option [ngValue]="2">Transport</option>
					<option [ngValue]="3">Entertainment</option>
					<option [ngValue]="4">Other</option>
					<option [ngValue]="5">Subscription</option>
				</select>
			</div>
		</div>
		<div class="modal-footer">
			<button class="btn btn-outline-secondary" (click)="activeModal.dismiss()">Cancel</button>
			<button class="btn btn-outline-secondary" (click)="activeModal.close(expense)">Update</button>
		</div>
	`,
})
export class UpdateExpenseModalComponent {
	activeModal = inject(NgbActiveModal);

	@Input() expense = {
		name : '', // just default values in case modal opens before input is passed
		amount : 0,
		categoryId : 0,
	}
}
