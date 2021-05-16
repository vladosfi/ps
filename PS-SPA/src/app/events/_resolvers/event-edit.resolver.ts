import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEvent } from 'src/app/shared/_interfaces/event';
import { ToastService } from 'src/app/_services/toast.service';
import { EventService } from '../event.service';
//import { IEvent } from '../_interfaces/event';


@Injectable()
export class EventEditResolver implements Resolve<IEvent>{
    constructor(
        private eventService: EventService,
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