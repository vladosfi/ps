import { Injectable } from '@angular/core';
import { IUser } from '../_interfaces/user';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../_services/toast.service';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class DetailEditResolver implements Resolve<IUser>{

    constructor(
        private userService: UserService,
        private router: Router,
        private toast: ToastService,
        private authService: AuthService) { }

        resolve(route: ActivatedRouteSnapshot): Observable<IUser>{
            return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
                catchError(error => {
                    this.toast.error('Problem retreiving your data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
            )
        }
}