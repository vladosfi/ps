import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventRoutingModule } from './event-routing.module';
import { EventsService } from './events.service';
import { EventsResolver } from './_resolvers/events.resolver';


@NgModule({
  declarations: [
    EventListComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
  ],
  providers:[
    EventsService,
    EventsResolver
  ]
})
export class EventModule {
  constructor() {
    console.log('Lazily Loaded : LazyModule');
  }
}
