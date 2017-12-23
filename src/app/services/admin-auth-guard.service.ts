import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate() {
    if (this.authService.currentUser && this.authService.currentUser.admin) return true;

    this.router.navigate(['/no-access']);
    return false;
  }

  constructor(
    private router: Router,
    private authService: AuthService) { }

}
