import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { StartComponent } from './start/start.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { appRoutes } from './routes';
import { ContactsComponent } from './contacts/contacts.component';
import { EventsComponent } from './events/events.component';
import { GalleryMixedComponent } from './gallery/gallery-mixed/gallery-mixed.component';
import { GallerySeaComponent } from './gallery/gallery-sea/gallery-sea.component';
import { GalleryMarineComponent } from './gallery/gallery-marine/gallery-marine.component';
import { ThumbComponent } from './gallery/thumb/thumb.component';
import { DetailComponent } from './gallery/detail/detail.component';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { AuthGuard } from './_guards/auth.guard';
import { DetailResolver } from './_resolvers/detail.resolver';
import { TimeagoModule } from 'ngx-timeago';
import { GalleryMixedResolver } from './_resolvers/gallery-mixed.resolver';
import { DetailEditComponent } from './gallery/detail-edit/gallery-detail-edit.component';
import { DetailEditResolver } from './_resolvers/detail-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes';
import { PhotoEditorComponent } from './gallery/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ListsComponent } from './lists/lists.component';
import { ListsResolver } from './_resolvers/lists.resolver';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StartComponent,
    RegisterComponent,
    ContactsComponent,
    EventsComponent,
    GalleryMixedComponent,
    GallerySeaComponent,
    GalleryMarineComponent,
    ThumbComponent,
    DetailComponent,
    DetailEditComponent,
    PhotoEditorComponent,
    ListsComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    CommonModule,
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    CollapseModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    PaginationModule.forRoot(),
    FileUploadModule,
    TimeagoModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth'],
      }
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    ErrorInterceptorProvider,
    DetailResolver,
    GalleryMixedResolver,
    DetailEditResolver,
    PreventUnsavedChanges,
    ListsResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
