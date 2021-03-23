import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventRoutingModule } from './event-routing.module';
import { EventsService } from './events.service';
import { EventsResolver } from './_resolvers/events.resolver';
import { EventsArticleComponent } from './events-article/events-article.component';
import { EventsAsideComponent } from './events-aside/events-aside.component';
import { EventsDetailsComponent } from './events-details/events-details.component';


@NgModule({
  declarations: [
    EventListComponent,
    EventsArticleComponent,
    EventsAsideComponent,
    EventsDetailsComponent
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
    //console.log('Lazily Loaded : LazyModule');
  }
}
