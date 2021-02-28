import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GalleryMixedComponent } from './gallery/gallery-mixed/gallery-mixed.component';
import { GallerySeaComponent } from './gallery/gallery-sea/gallery-sea.component';
import { GalleryMarineComponent } from './gallery/gallery-marine/gallery-marine.component';
import { AuthGuard } from './_guards/auth.guard';
import { DetailResolver } from './_resolvers/detail.resolver';
import { GalleryMixedResolver } from './_resolvers/gallery-mixed.resolver';
import { DetailEditComponent } from './gallery/detail-edit/gallery-detail-edit.component';
import { DetailEditResolver } from './_resolvers/detail-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes';
import { ListsComponent } from './lists/lists.component';
import { ListsResolver } from './_resolvers/lists.resolver';
import { DetailComponent } from './gallery/detail/detail.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent }, //home
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'gallery-mixed', component: GalleryMixedComponent,
                resolve: { users: GalleryMixedResolver }
            },
            { path: 'gallery-sea', component: GallerySeaComponent },
            { path: 'gallery-marine', component: GalleryMarineComponent },
            {
                path: 'gallery/:id', component: DetailComponent,
                resolve: { user: DetailResolver }
            },
            {
                path: 'gallery-detail-edit', component: DetailEditComponent,
                resolve: { user: DetailEditResolver }, canDeactivate: [PreventUnsavedChanges]
            },
        ]
    },
    { path: 'events', component: EventsComponent },
    { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver} },
    //{path: 'events', component: EventsComponent, canActivate:[AuthGuard]},
    { path: 'contacts', component: ContactsComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];