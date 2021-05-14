import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/_services/toast.service';
import { EventService } from '../event.service';
import { IEvent } from '../_interfaces/IEvent';


@Injectable()
export class EventDetailsResolver implements Resolve<IEvent>{
    constructor(
        private eventService: EventService,
        private router: Router,
        private toast: ToastService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IEvent> {
        return this.eventService.getEventById(route.params['id']).pipe(
            catchError(error => {
                this.toast.error('Problem retreiving event details');
                return of(null);
            })
        );
    }
}