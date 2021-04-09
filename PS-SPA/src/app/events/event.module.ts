import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventRoutingModule } from './event-routing.module';
import { EventsService } from './events.service';
import { EventsResolver } from './_resolvers/events.resolver';
import { EventsArticleComponent } from './events-article/events-article.component';
import { EventsAsideComponent } from './events-aside/events-aside.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EventListComponent,
    EventsArticleComponent,
    EventsAsideComponent,
    EventsDetailsComponent,
    EventsEditComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventRoutingModule,
    NgxEditorModule,
    SharedModule
  ],
  providers:[
    EventsService,
    EventsResolver,    
  ]
})
export class EventModule {
  constructor() {
    //console.log('Lazily Loaded : LazyModule');
  }
}
