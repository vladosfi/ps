// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AdminPaintingListComponent } from './admin-painting-list/admin-painting-list.component';
// import { AdminPaintingThumbComponent } from './admin-painting-thumb/admin-painting-thumb.component';
// import { FormsModule } from '@angular/forms';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { HttpClient } from '@angular/common/http';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { RouterModule, Routes } from '@angular/router';
// import { NgxGalleryModule } from 'ngx-gallery-9';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { PaginationModule  } from 'ngx-bootstrap/pagination';
// import { AdminRouterModule } from './admin-routing.module';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

// const adminRoutes: Routes = [
//   { path: 'admin',  component: AdminPaintingListComponent }
// ];

// @NgModule({
//   declarations: [
//     AdminPaintingListComponent,
//     AdminPaintingThumbComponent
//   ],
//   imports: [
//     CommonModule,
//     FormsModule,
//     TranslateModule.forChild({
//       loader: {
//         provide: TranslateLoader,
//         useFactory: (HttpLoaderFactory),
//         deps: [HttpClient],
//       }
//     }),
//     //RouterModule.forChild(adminRoutes),
//     NgxGalleryModule,
//     ModalModule,
//     PaginationModule,
//     AdminRouterModule,
//   ],
//   exports:[
//   ]
// })
// export class AdminModule { }
