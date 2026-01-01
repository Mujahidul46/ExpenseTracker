import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  imports: [],
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  @Input() confirmationMessage: string = 'Are you sure?'; // default value
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm() {
    this.confirmed.emit();
  }

  onCancel() {
    this.cancelled.emit();
  }
}
