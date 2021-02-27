import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastService } from '../_services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) { }

  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }

    this.toast.error('You shall not pass!');
    this.router.navigate(['/home']);
    return false;
  }

}
