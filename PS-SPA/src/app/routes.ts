import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
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
import { PaintingListComponent } from './paintings/painting-list/painting-list.component';
import { PaintingsResolver } from './_resolvers/paintings.resolver';
import { PaintingDetailsComponent } from './paintings/details/details.component';
import { PaintingResolver } from './_resolvers/painting.resolver';
import { PaintingAddComponent } from './paintings/painting-add/painting-add.component';


export const appRoutes: Routes = [
    { path: '', component: HomeComponent }, //home
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members', component: MembersComponent,
                resolve: { users: MembersResolver }
            },
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
    {
        path: '',
        children: [
            {
                path: 'paintings', component: PaintingListComponent,
                resolve: { paintings: PaintingsResolver }
            },
            {
                path: 'paintings/add', component: PaintingAddComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'paintings/:id', component: PaintingDetailsComponent,
                resolve: { painting: PaintingResolver }
            },
        ]
    },
    {
        path: 'events',
        loadChildren: () => import('./events/event.module').then(m => m.EventModule)
    },
    {
        path: 'contacts',
        loadChildren: () => import('./contacts/contact.module').then(m => m.ContactsModule)
    },
    {
        path: 'start',
        loadChildren: () => import('./start/start.module').then(m => m.StartModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
    //     path: '',
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [AuthGuard],
    //     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    //     resolve: { paintings: AdminPaintingsResolver }
    },
    // {
    //     path: '',
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [AuthGuard],
    //     children: [
    //         {
    //             path: 'admin', component: AdminPaintingListComponent,
    //             resolve: { paintings: AdminPaintingsResolver }
    //         },
    //     ]
    // },
    { path: 'lists', component: ListsComponent, resolve: { users: ListsResolver } },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];