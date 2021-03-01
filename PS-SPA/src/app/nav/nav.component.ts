import { Component, OnInit } from '@angular/core';
import { ToastService } from '../_services/toast.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  selectedLanguage: string;
  languagesToShow: any;
  
  constructor(
    public authService: AuthService,
    private toast: ToastService,
    private router: Router,
    public translate: TranslateService,
  ) { 
    translate.addLangs(['gb', 'bg', 'ru', 'de']);
    translate.setDefaultLang('gb');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/gb|bg|ru|de/) ? browserLang: 'gb');
    this.selectedLanguage = browserLang;
    this.languagesToShow = translate.getLangs().filter(l => l !== this.selectedLanguage);
  }

  ngOnInit() {
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

  changeLanguage(lang: string){
    //console.log(this.translate.currentLang);
    this.translate.use(lang)
    this.selectedLanguage = lang;
    this.languagesToShow = this.translate.getLangs().filter(l => l !== this.selectedLanguage);
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
