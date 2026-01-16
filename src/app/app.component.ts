import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './modules/auth/auth.service';
import { UserService } from './services/user.service';
import { UserData } from './model/interfaces/users/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MEDI-UP';
  showLayout = false;
  showUserMenu = false;
  userData: UserData | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.updateLayoutVisibility();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateLayoutVisibility();
      });
  }

  private updateLayoutVisibility(): void {
    const isAuthRoute = this.router.url.includes('/auth');
    const hasToken = this.authService.isLoggedInSync();
    this.showLayout = !isAuthRoute && hasToken;
    if (this.showLayout) {
      this.loadUserData();
    } else {
      this.userData = null;
    }
  }

  logout(): void {
    this.authService.logout();
    this.showLayout = false;
    this.router.navigate(['/auth']);
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
  }

  private loadUserData(): void {
    this.userService.getUserData().subscribe({
      next: (response) => {
        if (response.succeed) {
          this.userData = response.result;
        }
      },
      error: () => {
        this.userData = null;
      }
    });
  }
}
