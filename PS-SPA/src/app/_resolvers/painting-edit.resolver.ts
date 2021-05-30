import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../_services/toast.service';
import { PaintingService } from '../_services/painting.service';
import { IPaintingDetails } from '../_interfaces/painting-details';


@Injectable()
export class PaintingEditResolver implements Resolve<IPaintingDetails>{
    constructor(
        private paintingService: PaintingService,
        private router: Router,
        private toast: ToastService) { }
                                          
    resolve(route: ActivatedRouteSnapshot): Observable<IPaintingDetails> {
        return this.paintingService.editPainting(route.params['id']).pipe(
            catchError(error => {
                this.toast.error('Problem retreiving painting editing details');
                this.router.navigate(['/paintings']);
                return of(null);
            })
        )
    }
}