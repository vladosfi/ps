import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ToastService } from '../../_services/toast.service';
import { AuthService } from '../../_services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loginModel: FormGroup;
  
  photoUrl: string;
  selectedLanguage: string;
  languagesToShow: any;
  isCollapsed = true;
  public declarativeFormCaptchaValue: string;
  baseUrl = environment.localhost;
  private currentSiteTitle: string = 'GENERAL.TITLE';
  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;


  constructor(
    public authService: AuthService,
    private toast: ToastService,
    public router: Router,
    public translate: TranslateService,
    private renderer: Renderer2,
    private titleService: Title,
    private metaService: Meta,
    private ccService: NgcCookieConsentService,
    private route: ActivatedRoute
  ) {
    translate.addLangs(['gb', 'bg', 'ru', 'de']);
    translate.setDefaultLang('gb');

    var browserLang = translate.getBrowserLang();
    if (localStorage.getItem('currentLang')) {
      browserLang = localStorage.getItem('currentLang');
      document.documentElement.lang = browserLang;
    }

    translate.use(browserLang.match(/gb|bg|ru|de/) ? browserLang : 'gb');
    this.selectedLanguage = browserLang;
    this.languagesToShow = translate.getLangs().filter(l => l !== this.selectedLanguage);
    this.renderer.setAttribute(document.querySelector('html'), 'lang', this.selectedLanguage);

    this.translateCookie();
    this.setMetaTags();
  }


  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    this.initCookies();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const rt = this.getChild(this.route);
      rt.data.subscribe(data => {
        this.setSiteTitle(data.title)
      });
    });
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  setSiteTitle(newTitle: string) {
    //console.log(this.translate.instant('GENERAL.TITLE'));
    //var test = '\'' + newTitle + '\'';
    if (newTitle == null) return;
    
    this.currentSiteTitle = newTitle;
    this.translate.get(newTitle).subscribe((t: string) => {
      this.titleService.setTitle(t);
    });
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

  changeLanguage(lang: string) {
    this.translate.use(lang)
    this.selectedLanguage = lang;
    this.languagesToShow = this.translate.getLangs().filter(l => l !== this.selectedLanguage);
    this.renderer.setAttribute(document.querySelector('html'), 'lang', this.selectedLanguage);
    localStorage.setItem('currentLang', lang);
    document.documentElement.lang = lang;
    //this.router.navigate(['/home']);
    //window.location.reload();
    //window.location.href = window.location.href;
    this.setSiteTitle(this.currentSiteTitle);
    this.translateCookie();
    //window.location.reload();
    //this.router.navigate([window.location.href]);
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.toast.info('Logged out');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['/home']);
  }

  translateCookie() {
    this.translate
      .get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
      .subscribe(data => {

        this.ccService.getConfig().content = this.ccService.getConfig().content || {};
        // Override default messages with the translated ones
        this.ccService.getConfig().content.header = data['cookie.header'];
        this.ccService.getConfig().content.message = data['cookie.message'];
        this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
        this.ccService.getConfig().content.allow = data['cookie.allow'];
        this.ccService.getConfig().content.deny = data['cookie.deny'];
        this.ccService.getConfig().content.link = data['cookie.link'];
        this.ccService.getConfig().content.policy = data['cookie.policy'];

        this.ccService.destroy();//remove previous cookie bar (with default messages)
        this.ccService.init(this.ccService.getConfig()); // update config with translated messages
      });
  }

  setMetaTags() {
    this.translate.get('GENERAL.META-KEYWORDS').subscribe((keywords: string) => {
      //console.log(keywords);
      this.metaService.addTag({ name: 'keywords', keywords });
    });

    this.translate.get('GENERAL.META-DESCRIPTION').subscribe((description: string) => {
      this.metaService.addTag({ name: 'description', description });
    });
  }


  initCookies() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
  }


  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

}
