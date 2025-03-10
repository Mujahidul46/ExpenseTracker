import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'expense-tracker';
  expenses: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    console.log('AppComponent initialized');
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