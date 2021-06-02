import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { PreventUnsavedChanges } from '../_guards/prevent-unsaved-changes';
import { DetailEditResolver } from '../_resolvers/detail-edit.resolver';
import { DetailResolver } from '../_resolvers/detail.resolver';
import { MembersResolver } from '../_resolvers/members.resolver';
import { DetailEditComponent } from './detail-edit/detail-edit.component';
import { DetailComponent } from './detail/detail.component';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: '', component: MembersComponent,
                resolve: { users: MembersResolver }
            },
            {
                path: 'detail-edit', component: DetailEditComponent,
                resolve: { user: DetailEditResolver }, 
                canDeactivate: [PreventUnsavedChanges]
            },
            {
                path: ':id', component: DetailComponent,
                resolve: { user: DetailResolver }
            }            
        ]
    }
];




export const MembersRoutingModule = RouterModule.forChild(routes);


// const routes: Routes = [
//     {
//         path: '',
//         component: EventListComponent,
//         resolve: { events: EventsResolver }
//         // canActivate:[AuthGuard]
//     },
//     {
//         path: 'add',
//         component: EventsAddComponent,
//     },
//     {
//         path: 'edit/:id',
//         runGuardsAndResolvers: 'always',
//         canActivate: [AuthGuard],
//         component: EventsEditComponent,
//         resolve: { events: EventEditResolver },
//         canDeactivate: [PreventUnsavedChangesForEvents]
//     },
//     {
//         path: ':id',
//         component: EventsDetailsComponent,
//         resolve: { events: EventDetailsResolver }
//         // canActivate:[AuthGuard]
//     },
// ];

// {
//     path: '',
//     runGuardsAndResolvers: 'always',
//     canActivate: [AuthGuard],
//     children: [
//         {
//             path: 'members', component: MembersComponent,
//             resolve: { users: MembersResolver }
//         },
//         {
//             path: 'gallery/:id', component: DetailComponent,
//             resolve: { user: DetailResolver }
//         },
//         {
//             path: 'gallery-detail-edit', component: DetailEditComponent,
//             resolve: { user: DetailEditResolver }, canDeactivate: [PreventUnsavedChanges]
//         },
//     ]
// },