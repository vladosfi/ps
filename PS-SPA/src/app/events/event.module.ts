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
import { EventDetailsResolver } from './_resolvers/event-details.resolver';
import { EventEditResolver } from './_resolvers/event-edit.resolver';
import { NgxGalleryModule } from 'ngx-gallery-9';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { PreventUnsavedChangesForEvents } from '../_guards/prevent-unsaved-changes';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    NgxGalleryModule,
    PaginationModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient],
      }
    }),
  ],
  providers:[
    EventService,
    EventsResolver,
    EventDetailsResolver,
    EventEditResolver,
    PreventUnsavedChangesForEvents
  ]
})
export class EventModule {
  constructor() {
    console.log('Lazily Loaded : LazyModule - Event');
  }
}
