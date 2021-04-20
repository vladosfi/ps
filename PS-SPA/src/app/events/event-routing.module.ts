import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { EventsAddComponent} from './events-add/events-add.component';
import { EventsResolver } from './_resolvers/events.resolver';

const routes: Routes = [
    {
        path: '',
        component: EventListComponent,
        resolve: { events: EventsResolver }
        // canActivate:[AuthGuard]
    },
    {
        path: 'add',
        component: EventsAddComponent,
    },
    {
        path: 'details',
        component: EventsDetailsComponent,
    }
];

export const EventRoutingModule = RouterModule.forChild(routes);