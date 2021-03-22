import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventsResolver } from './_resolvers/events.resolver';

const routes: Routes = [
    {
        path: '', 
        component: EventListComponent, 
        resolve: { events: EventsResolver }
        // canActivate:[AuthGuard]
    }
];

export const EventRoutingModule = RouterModule.forChild(routes);