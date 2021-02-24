import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GalleryMixedComponent } from './gallery/gallery-mixed/gallery-mixed.component';
import { GallerySeaComponent } from './gallery/gallery-sea/gallery-sea.component';
import { GalleryMarineComponent } from './gallery/gallery-marine/gallery-marine.component';
import { AuthGuard } from './_guards/auth.guard';
import { GalleryDetailComponent } from './gallery/gallery-detail/gallery-detail.component';
import { GalleryDetailResolver } from './_resolvers/gallery-detai.resolver';
import { GalleryMixedResolver } from './_resolvers/gallery-mixed.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent }, //home
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'gallery-mixed', component: GalleryMixedComponent, resolve: {users: GalleryMixedResolver} },
            { path: 'gallery-sea', component: GallerySeaComponent },
            { path: 'gallery-marine', component: GalleryMarineComponent },
            { path: 'gallery/:id', component: GalleryDetailComponent, resolve: {user: GalleryDetailResolver} },
        ]
    },
    { path: 'events', component: EventsComponent },
    //{path: 'events', component: EventsComponent, canActivate:[AuthGuard]},
    { path: 'contacts', component: ContactsComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];