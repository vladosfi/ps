import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { EventsAddComponent } from './events-add/events-add.component';
import { EventsResolver } from './_resolvers/events.resolver';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { EventDetailsResolver } from './_resolvers/event-details.resolver';
import { EventEditResolver } from './_resolvers/event-edit.resolver';
import { PreventUnsavedChangesForEvents } from '../_guards/prevent-unsaved-changes';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: EventListComponent,
        resolve: { events: EventsResolver },
        data: {title: 'GENERAL.EVENTS'}   
        // canActivate:[AuthGuard]
    },
    {
        path: 'add',
        component: EventsAddComponent,
    },
    {
        path: 'edit/:id',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        component: EventsEditComponent,
        resolve: { events: EventEditResolver },
        canDeactivate: [PreventUnsavedChangesForEvents]
    },
    {
        path: ':id',
        component: EventsDetailsComponent,
        resolve: { events: EventDetailsResolver }
        // canActivate:[AuthGuard]
    },
];

export const EventRoutingModule = RouterModule.forChild(routes);

