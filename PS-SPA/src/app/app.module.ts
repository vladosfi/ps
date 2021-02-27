import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { appRoutes } from './routes';
import { ContactsComponent } from './contacts/contacts.component';
import { EventsComponent } from './events/events.component';
import { GalleryMixedComponent } from './gallery/gallery-mixed/gallery-mixed.component';
import { GallerySeaComponent } from './gallery/gallery-sea/gallery-sea.component';
import { GalleryMarineComponent } from './gallery/gallery-marine/gallery-marine.component';
import { GalleryThumbComponent } from './gallery/gallery-thumb/gallery-thumb.component';
import { GalleryDetailComponent } from './gallery/gallery-detail/gallery-detail.component';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { AuthGuard } from './_guards/auth.guard';
import { GalleryDetailResolver } from './_resolvers/gallery-detail.resolver';
import { TimeagoModule } from 'ngx-timeago';
import { GalleryMixedResolver } from './_resolvers/gallery-mixed.resolver';
import { GalleryDetailEditComponent } from './gallery/gallery-detail-edit/gallery-detail-edit.component';
import { GalleryDetailEditResolver } from './_resolvers/gallery-detail-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes';
import { GalleryPhotoEditorComponent } from './gallery/gallery-photo-editor/gallery-photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ContactsComponent,
    EventsComponent,
    GalleryMixedComponent,
    GallerySeaComponent,
    GalleryMarineComponent,
    GalleryThumbComponent,
    GalleryDetailComponent,
    GalleryDetailEditComponent,
    GalleryPhotoEditorComponent,
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
    FileUploadModule,
    TimeagoModule.forRoot(),
    TabsModule.forRoot(),
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
    GalleryDetailResolver,
    GalleryMixedResolver,
    GalleryDetailEditResolver,
    PreventUnsavedChanges,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
