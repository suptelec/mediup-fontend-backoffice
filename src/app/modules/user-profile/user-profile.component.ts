import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../auth/auth.service';
import { UserData } from 'src/app/model/interfaces/users/user.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userData: UserData | null = null;
  loading = true;
  error = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  private loadUserData(): void {
    this.userService.getUserData().subscribe({
      next: (response) => {
        if (response.succeed) {
          this.userData = response.result;
        } else {
          this.error = response.message || 'Error al cargar datos del usuario';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar la información del usuario';
        this.loading = false;
      }
    });
  }
}
