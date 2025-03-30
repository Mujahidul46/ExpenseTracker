import { Routes } from '@angular/router';

// Import components
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataUploadComponent } from './data-upload/data-upload.component';
import { IncomeTableComponent } from './income-table/income-table.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';

// Routes
export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'data-upload', component: DataUploadComponent },
    { path: 'income', component: IncomeTableComponent },
    { path: 'expenses', component: ExpensesTableComponent },
];
