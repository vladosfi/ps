import { Component, OnInit } from '@angular/core';
import { ToastService } from '../_services/toast.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  siteLanguage: string = 'English';
  siteLocale: string;
  languageList = [
    { code: 'en', label: 'English' },
    { code: 'bg', label: 'Български' },
    { code: 'ru', label: 'Русский' },
    { code: 'de', label: 'Deutsch' }
  ];

  model: any = {};
  photoUrl: string;

  constructor(
    public authService: AuthService,
    private toast: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.siteLocale = window.location.pathname.split('/')[1];
    this.siteLanguage = this.languageList.find(f => f.code === this.siteLocale).label;

    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login(model) {
    this.authService.login(model).subscribe(next => {
      this.toast.success('Logged in successfully', '');
    }, error => {
      this.toast.error(error);
    }, () => {
      this.router.navigate(['/home']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.toast.info('Logged out');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['/home']);
  }
}
