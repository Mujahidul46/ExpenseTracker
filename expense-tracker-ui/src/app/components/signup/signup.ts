import { Component, TemplateRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {};

  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  signup(successSignupTemplate: TemplateRef<any>) {
    const signupDetails = {
      email: this.email,
      username: this.username,
      password: this.password,
    };

    if (!this.email || !this.username || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    this.authService.signUp(signupDetails).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.toastService.show({
          template: successSignupTemplate,
          classname: 'bg-success text-light'
        });
      },
      error: (error) => {
        alert('Signup failed. Please try again.');
      }
    });
  }
}
