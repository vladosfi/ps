import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { AdminPaintingsResolver } from './_resolvers/admin-paintings.resolver';
import { AdminPaintingListComponent } from './admin-painting-list/admin-painting-list.component';

const routes: Routes = [
    {
        path: '',
        component: AdminPaintingListComponent,
        resolve: { paintings: AdminPaintingsResolver },
    }
];

export const AdminRouterModule = RouterModule.forChild(routes);

