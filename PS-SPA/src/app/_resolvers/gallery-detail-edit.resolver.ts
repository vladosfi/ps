import { Injectable } from '@angular/core';
import { IUser } from '../_models/user';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PopupService } from '../_services/popup.service';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class GalleryDetailEditResolver implements Resolve<IUser>{

    constructor(
        private userService: UserService,
        private router: Router,
        private popup: PopupService,
        private authService: AuthService) { }

        resolve(route: ActivatedRouteSnapshot): Observable<IUser>{
            return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
                catchError(error => {
                    this.popup.error('Problem retreiving your data');
                    this.router.navigate(['/gallery']);
                    return of(null);
                })
            )
        }
}