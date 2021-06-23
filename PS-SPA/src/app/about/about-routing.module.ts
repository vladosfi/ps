import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/contacts.component';

const routes: Routes = [
    {
        path: '',
        component: AboutComponent,
        data: {title: 'NAV.ABOUT'}    
    }
];

export const AboutRoutingModule = RouterModule.forChild(routes);