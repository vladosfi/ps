import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartComponent } from './start.component';
import { StartRoutingModule } from './start-routing.module';
import { RegisterComponent } from './register/register.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    StartComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    StartRoutingModule,
  ],
  providers: [
  ]
})
export class StartModule {
  constructor() {
    console.log('Lazily Loaded : LazyModule - Start');
  }
}