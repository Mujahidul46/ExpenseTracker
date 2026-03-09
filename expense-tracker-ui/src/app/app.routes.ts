import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { LoginComponent  } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'dashboard', component: Dashboard },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
];
