import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEvent } from 'src/app/shared/_interfaces/event';
import { ToastService } from 'src/app/_services/toast.service';
import { EventService } from '../event.service';
//import { IEvent } from '../_interfaces/event';


@Injectable()
export class EventsResolver implements Resolve<IEvent>{
    pageNumber = 1;
    pageSize = 6;
    eventParams;

    constructor(
        private eventService: EventService,
        private router: Router,
        private toast: ToastService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<IEvent> {
        return this.eventService.getEvents(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.toast.error('Problem retreiving events');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}