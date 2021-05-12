import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventRoutingModule } from './event-routing.module';
import { EventService } from './event.service';
import { EventsResolver } from './_resolvers/events.resolver';
import { EventsArticleComponent } from './events-article/events-article.component';
import { EventsAsideComponent } from './events-aside/events-aside.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { EventsAddComponent } from './events-add/events-add.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    EventListComponent,
    EventsArticleComponent,
    EventsAsideComponent,
    EventsDetailsComponent,
    EventsAddComponent,
    EventsEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventRoutingModule,
    NgxEditorModule,
    SharedModule,
    PaginationModule
  ],
  providers:[
    EventService,
    EventsResolver,    
  ]
})
export class EventModule {
  constructor() {
    //console.log('Lazily Loaded : LazyModule');
  }
}
