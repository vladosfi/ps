import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactsRoutingModule } from './contact-routing.module';
import { ReCaptchaModule } from 'angular-recaptcha3';


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
          sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', 
      },
      normal: {
          sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', 
      },
      language: 'en'
  }),
  ],
  providers: [
  ]
})


export class ContactsModule {
  constructor() {
    console.log('Lazily Loaded : LazyModule - Contacts');
  }
}