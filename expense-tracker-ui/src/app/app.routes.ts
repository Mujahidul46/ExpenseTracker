import { Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { LoginComponent  } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { AppointmentsComponent } from './components/appointments/appointments';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'user-dashboard', component: UserDashboardComponent },
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
];
