import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPaintingListComponent } from './admin-painting-list/admin-painting-list.component';
import { AdminPaintingThumbComponent } from './admin-painting-thumb/admin-painting-thumb.component';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AdminPaintingsResolver } from './_resolvers/admin-paintings.resolver';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from './admin.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdminPaintingListComponent,
    AdminPaintingThumbComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient],
      }
    }),
    NgxGalleryModule,
    ModalModule,
    PaginationModule,
    ButtonsModule,
    //SharedModule,
  ],
  providers: [
    AdminPaintingsResolver,
    AdminService,
  ]
})
export class AdminModule {
  constructor() {
    console.log('Lazily Loaded : LazyModule - Admin');
  }
}