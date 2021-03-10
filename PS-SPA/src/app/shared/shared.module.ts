import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimalNumericDirective } from './decimal-numeric.directive';



@NgModule({
  declarations: [DecimalNumericDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
