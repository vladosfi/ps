import { Injectable } from '@angular/core';
import { IUser } from '../_models/user';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PopupService } from '../_services/popup.service';


@Injectable()
export class GalleryMixedResolver implements Resolve<IUser[]>{
    pageNumber = 1;
    pageSize = 5;

    constructor(
        private userService: UserService,
        private router: Router,
        private popup: PopupService) { }

        resolve(route: ActivatedRouteSnapshot): Observable<IUser[]>{
            return this.userService.getUsers().pipe(
                catchError(error => {
                    this.popup.error('Problem retreiving data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            )
        }
}