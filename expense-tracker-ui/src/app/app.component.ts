import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastsContainer } from './shared/toasts-container/toasts-container';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastsContainer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor (
    private authService: AuthService,
    private router: Router
  ) {

  }

  logout() {
    this.authService.LogOut();
    this.router.navigate(['/login']);
  }
}
