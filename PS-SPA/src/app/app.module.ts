import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_interceptors/error.interceptor';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { TimeagoModule } from 'ngx-timeago';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './home/home.component';
import { PaintingListComponent } from './paintings/painting-list/painting-list.component';
import { ThumbComponent } from './paintings/thumb/thumb.component';
import { CoreModule } from './core/core.module';
import { PaintingsResolver } from './_resolvers/paintings.resolver';
import { PaintingDetailsComponent } from './paintings/details/details.component';
import { PaintingResolver } from './_resolvers/painting.resolver';
import { PaintingAddComponent } from './paintings/painting-add/painting-add.component';
import { PaintingEditComponent } from './paintings/edit/edit.component';
import { ImageEditorComponent } from './paintings/image-editor/image-editor.component';
import { ModalWindowService } from './shared/_service/modal-window.service';
import { SharedModule } from './shared/shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { PaintingEditResolver } from './_resolvers/painting-edit.resolver';
import { LoaderInterceptor } from './_interceptors/loader-interceptor';
import { LoaderService } from './_services/loader.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaintingListComponent,
    ThumbComponent,
    PaintingDetailsComponent,
    PaintingAddComponent,
    PaintingEditComponent,
    ImageEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    FileUploadModule,
    ToastrModule.forRoot(), // ToastrModule added
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    InfiniteScrollModule,
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
    CoreModule,
    SharedModule,
    NgxEditorModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    ErrorInterceptorProvider,
    PaintingsResolver,
    PaintingResolver,
    PaintingEditResolver,
    ModalWindowService,
    TranslateService,
    LoaderService,
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


