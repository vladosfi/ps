import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalNumericDirective } from './decimal-numeric.directive';
import { ModalWindowService } from './_service/modal-window.service';
import { EditorComponent } from './edit/editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DecimalNumericDirective,
    ModalWindowService,
    EditorComponent
  ],
  imports: [
    CommonModule,
    NgxEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    ModalWindowService,
    DecimalNumericDirective,
    EditorComponent
  ]
})
export class SharedModule { }
