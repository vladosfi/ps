import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalNumericDirective } from './decimal-numeric.directive';
import { ModalWindowService } from './_service/modal-window.service';
import { EditorComponent } from './components/text-editor/editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageService } from './_service/image.service';
import { InputNameComponent } from './components/input-name/input-name.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    DecimalNumericDirective,
    ModalWindowService,
    EditorComponent,
    ImageUploaderComponent,
    InputNameComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  exports:[
    ModalWindowService,
    DecimalNumericDirective,
    EditorComponent,
    InputNameComponent,
    ImageUploaderComponent,
    LoaderComponent
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
        ImageService
      ],
    };
 }
 }