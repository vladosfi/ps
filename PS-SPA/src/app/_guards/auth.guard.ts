import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { PopupService } from '../_services/popup.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private popup: PopupService
  ) { }

  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }

    this.popup.error('You shall not pass!');
    this.router.navigate(['/home']);
    return false;
  }

}
