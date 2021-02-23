import { Component, OnInit } from '@angular/core';
import { PopupService } from '../_services/popup.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private popup: PopupService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login(model) {
    this.authService.login(model).subscribe(next => {
      this.popup.success('Logged in successfully', '');
    }, error => {
      this.popup.error(error);
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.popup.info('Logged out');
    this.router.navigate(['/home']);
  }
}
