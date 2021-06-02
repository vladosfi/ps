import { Component, OnInit,Renderer2 } from '@angular/core';
import { ToastService } from '../../_services/toast.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getLocale } from 'ngx-bootstrap/chronos';

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
  isCollapsed = true;

  constructor(
    public authService: AuthService,
    private toast: ToastService,
    public router: Router,
    public translate: TranslateService,
    private renderer: Renderer2
  ) { 
    translate.addLangs(['gb', 'bg', 'ru', 'de']);
    translate.setDefaultLang('gb');

    var browserLang = translate.getBrowserLang();
    if(localStorage.getItem('currentLang')){
      browserLang = localStorage.getItem('currentLang');
      document.documentElement.lang = browserLang;
    }

    translate.use(browserLang.match(/gb|bg|ru|de/) ? browserLang : 'gb');
    this.selectedLanguage = browserLang;
    this.languagesToShow = translate.getLangs().filter(l => l !== this.selectedLanguage);
    this.renderer.setAttribute(document.querySelector('html'), 'lang', this.selectedLanguage);
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
    this.translate.use(lang)
    this.selectedLanguage = lang;
    this.languagesToShow = this.translate.getLangs().filter(l => l !== this.selectedLanguage);
    this.renderer.setAttribute(document.querySelector('html'), 'lang', this.selectedLanguage);
    localStorage.setItem('currentLang', lang);
    document.documentElement.lang = lang;
    //this.router.navigate(['/home']);
    //window.location.reload();
    //window.location.href = window.location.href;
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
