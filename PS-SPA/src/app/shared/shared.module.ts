import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalNumericDirective } from './decimal-numeric.directive';
import { ModalWindowService } from './_service/modal-window.service';



@NgModule({
  declarations: [
    DecimalNumericDirective,
    ModalWindowService
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ModalWindowService
  ]
})
export class SharedModule { }
