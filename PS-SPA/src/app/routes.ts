import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { PaintingListComponent } from './paintings/painting-list/painting-list.component';
import { PaintingsResolver } from './_resolvers/paintings.resolver';
import { PaintingDetailsComponent } from './paintings/details/details.component';
import { PaintingResolver } from './_resolvers/painting.resolver';
import { PaintingAddComponent } from './paintings/painting-add/painting-add.component';
import { PaintingEditResolver } from './_resolvers/painting-edit.resolver';
import { PaintingEditComponent } from './paintings/edit/edit.component';




export const appRoutes: Routes = [
    {
        path: '', component: HomeComponent,
        data: {
            title: 'GENERAL.TITLE'
        }
    }, //home
    {
        path: '',
        children: [
            {
                path: 'paintings', component: PaintingListComponent,
                resolve: { paintings: PaintingsResolver },
                data: {
                    title: 'GENERAL.GALLERY'
                }
            },
            {
                path: 'paintings/add', component: PaintingAddComponent,
                canActivate: [AuthGuard],
                data: {
                    title: 'GENERAL.GALLERY'
                }
            },
            {
                path: 'paintings/edit/:id', component: PaintingEditComponent,
                resolve: { painting: PaintingEditResolver },
                canActivate: [AuthGuard],
                data: {
                    title: 'GENERAL.GALLERY'
                }
            },
            {
                path: 'paintings/:id', component: PaintingDetailsComponent,
                resolve: { painting: PaintingResolver },
                data: {
                    title: 'GENERAL.GALLERY'
                }
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
        path: 'members',
        loadChildren: () => import('./members/members.module').then(m => m.MembersModule)
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
    { path: '**', redirectTo: '', pathMatch: 'full' },
];