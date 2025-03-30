import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  expenses: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    console.log('DashboardComponent initialized');
    this.apiService.getExpenses().subscribe(
      (data) => {
        console.log('Data received from API:', data);
        this.expenses = data;
      },
      (error) => {
        console.error('Error fetching data from API:', error);
      }
    );
  }
}