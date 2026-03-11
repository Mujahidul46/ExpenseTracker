import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Stats } from '../stats/stats';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, Stats, UserDashboardComponent],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.scss',
})
export class BottomNav {
  constructor (
    private authService: AuthService,
    private router: Router
  ) {

  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
