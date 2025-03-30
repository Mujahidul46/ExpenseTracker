import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-upload',
  standalone: true, // Make it standalone
  imports: [CommonModule, FormsModule], // Import FormsModule here
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent {
}