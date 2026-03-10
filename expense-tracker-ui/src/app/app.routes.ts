import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { LoginComponent  } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { Stats } from './components/stats/stats';
import { Expenses } from './components/expenses/expenses';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    //{ path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'expenses', component: Expenses },
    { path: 'expenses', component: Expenses },
    { path: 'stats', component: Stats },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
];
