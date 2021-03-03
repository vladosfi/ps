import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { EventsComponent } from './events/events.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MembersComponent } from './gallery/members/members.component';
import { AuthGuard } from './_guards/auth.guard';
import { DetailResolver } from './_resolvers/detail.resolver';
import { MembersResolver } from './_resolvers/members.resolver';
import { DetailEditComponent } from './gallery/detail-edit/gallery-detail-edit.component';
import { DetailEditResolver } from './_resolvers/detail-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes';
import { ListsComponent } from './lists/lists.component';
import { ListsResolver } from './_resolvers/lists.resolver';
import { DetailComponent } from './gallery/detail/detail.component';
import { HomeComponent } from './home/home.component';
import { MixedComponent } from './paintings/mixed/mixed.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent }, //home
    { path: 'home', component: HomeComponent }, //home
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members', component: MembersComponent,
                resolve: { users: MembersResolver }
            },
            // { path: 'gallery-sea', component: GallerySeaComponent },
            // { path: 'gallery-marine', component: GalleryMarineComponent },
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
    { path: 'mixed', component: MixedComponent },
    { path: 'start', component: StartComponent },
    { path: 'events', component: EventsComponent },
    { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver} },
    //{path: 'events', component: EventsComponent, canActivate:[AuthGuard]},
    { path: 'contacts', component: ContactsComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];