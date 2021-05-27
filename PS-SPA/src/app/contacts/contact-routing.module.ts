import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';

const routes: Routes = [
    {
        path: '',
        component: ContactsComponent,
    }
];

export const ContactsRoutingModule = RouterModule.forChild(routes);