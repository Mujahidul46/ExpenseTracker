import { Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { Login  } from './components/login/login';
import { Signup } from './components/signup/signup';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login},
    { path: 'signup', component: Signup},
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
];
