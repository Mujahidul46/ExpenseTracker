import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
    constructor (
      private authService : AuthService,
      private router : Router
    ) 
    {

    };

    username: string = '';
    password: string = '';

    login() {
      const loginDetails = {
        username: this.username,
        password: this.password
      }
      this.authService.logIn(loginDetails).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/user-dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Login failed. Please check your username and password, and try again.');
        }
      });
    }
}
