import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsRoutingModule } from './contact-routing.module';
import { ReCaptchaModule } from 'angular-recaptcha3';
import { ContactsService } from '../_services/contact.service';
import { environment } from 'src/environments/environment';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient],
      }
    }),
    ContactsRoutingModule,
    ReCaptchaModule.forRoot({
      invisible: {
          sitekey: environment.reCaptchaSiteKey, 
      },
      normal: {
          sitekey: environment.reCaptchaSiteKey, 
      },
      language: localStorage.getItem('currentLang') ? localStorage.getItem('currentLang') : 'en' 
  }),
  ],
  providers: [
    ContactsService
  ]
})


export class ContactsModule {
  constructor() {
    console.log('Lazily Loaded : LazyModule - Contacts');
  }
}