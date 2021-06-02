import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { MembersComponent } from './members/members.component';
import { MemberThumbComponent } from './member-thumb/members-thumb.component';
import { DetailEditComponent } from './detail-edit/detail-edit.component';
import { DetailComponent } from './detail/detail.component';
import { MembersRoutingModule } from './members-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxEditorModule } from 'ngx-editor';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FileUploadModule } from 'ng2-file-upload';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimeagoModule } from 'ngx-timeago';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PreventUnsavedChanges } from '../_guards/prevent-unsaved-changes';
import { DetailResolver } from '../_resolvers/detail.resolver';
import { MembersResolver } from '../_resolvers/members.resolver';
import { DetailEditResolver } from '../_resolvers/detail-edit.resolver';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    PhotoEditorComponent,
    MembersComponent,
    MemberThumbComponent,
    DetailEditComponent,
    DetailComponent
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
    MembersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxEditorModule,
    NgxGalleryModule,
    PaginationModule,  
    FileUploadModule,
    TimeagoModule,
    TabsModule,
    ButtonsModule
  ],
  providers: [
    MembersResolver,
    DetailResolver,
    DetailEditResolver,
    PreventUnsavedChanges,
  ]
})
export class MembersModule {
  constructor() {
    console.log('Lazily Loaded : LazyModule - Members');
  }
}