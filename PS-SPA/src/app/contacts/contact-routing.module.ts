import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
    {
        path: '',
        component: ContactsComponent,
        data: {title: 'GENERAL.CONTACTS'}    
    }
];

export const ContactsRoutingModule = RouterModule.forChild(routes);