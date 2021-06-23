import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AboutComponent } from './about/contacts.component';
import { AboutRoutingModule } from './about-routing.module';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AboutComponent
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
    AboutRoutingModule
  ],
  providers: [
  ]
})
export class AboutModule {
  constructor() {
    console.log('Lazily Loaded : LazyModule - About');
  }
}