import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../_services/toast.service';
import { IPainting } from '../_interfaces/painting';
import { PaintingService } from '../_services/painting.service';


@Injectable()
export class PaintingsResolver implements Resolve<IPainting[]>{
    pageNumber = 1;
    pageSize = 5;
    paintingParams = {
        categoryId: 1
    }

    constructor(
        private paintingService: PaintingService,
        private router: Router,
        private toast: ToastService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IPainting[]> {
        return this.paintingService.getPaintings(this.pageNumber, this.pageSize, this.paintingParams).pipe(
            catchError(error => {
                this.toast.error('Problem retreiving paintings');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}