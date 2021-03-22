import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
    {
        path: '', 
        component: EventListComponent, 
        // canActivate:[AuthGuard]
    }
];

export const EventRoutingModule = RouterModule.forChild(routes);