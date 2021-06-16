import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Meta } from '@angular/platform-browser';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';

const cookieConfig:NgcCookieConsentConfig = {
  "cookie": {
    "domain": "localhost"
  },
  "position": "bottom",
  "theme": "edgeless",
  "palette": {
    "popup": {
      "background": "#21539c",
      "text": "#ffffff",
      "link": "#ffffff"
    },
    "button": {
      "background": "#f1d600",
      "text": "#000000",
      "border": "transparent"
    }
  },
  "type": "info",
  "content": {
    "href": "http://localhost:4200",
  }
};


@NgModule({
  declarations: [
    NavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabsModule,
    ButtonsModule,
    BsDatepickerModule,
    BsDropdownModule,
    RouterModule,
    CollapseModule,
    TranslateModule.forChild(),
    BrowserModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [Meta],
  exports:[
    NavComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
