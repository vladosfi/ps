import { Injectable } from '@angular/core';
import { IUser } from '../_interfaces/user';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../_services/toast.service';


@Injectable()
export class DetailResolver implements Resolve<IUser>{

    constructor(
        private userService: UserService,
        private router: Router,
        private toast: ToastService) { }

        resolve(route: ActivatedRouteSnapshot): Observable<IUser>{
            return this.userService.getUser(Number(route.params['id'])).pipe(
                catchError(error => {
                    this.toast.error('Problem retreiving data');
                    this.router.navigate(['/gallery']);
                    return of(null);
                })
            )
        }
}