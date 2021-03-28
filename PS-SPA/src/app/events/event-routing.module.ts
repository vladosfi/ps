import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { EventsResolver } from './_resolvers/events.resolver';

const routes: Routes = [
    {
        path: '',
        component: EventListComponent,
        resolve: { events: EventsResolver }
        // canActivate:[AuthGuard]
    },
    {
        path: 'edit',
        component: EventsEditComponent,
    },
    {
        path: 'details',
        component: EventsDetailsComponent,
    }
];

export const EventRoutingModule = RouterModule.forChild(routes);