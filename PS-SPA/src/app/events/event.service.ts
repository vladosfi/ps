import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IEvent } from '../shared/_interfaces/event';
import { PaginatedResult } from '../_interfaces/pagination';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class EventService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getEvents(page?, itemsPerPage?, eventParams?): Observable<PaginatedResult<IEvent[]>> {

    const paginatedResult: PaginatedResult<IEvent[]> = new PaginatedResult<IEvent[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    params = params.append('language', localStorage.getItem('currentLang'));

    return this.http.get<IEvent[]>(this.baseUrl + 'events', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        }));
  }

  getLatestEvents(): Observable<IEvent[]> {
    let latestEvents: IEvent[];
    let params = new HttpParams();
    params = params.append('language', localStorage.getItem('currentLang'));

    return this.http.get<IEvent[]>(this.baseUrl + 'events/latest', { observe: 'response', params })
      .pipe(
        map(response => {
          latestEvents = response.body;
          return latestEvents;
        }));
  }

  getEventByIdForCurrentLanguage(id: string): Observable<IEvent> {
    let params = new HttpParams();
    params = params.append('language', localStorage.getItem('currentLang'));
    
    return this.http.get<IEvent>(this.baseUrl + 'events/' + id, { observe: 'response', params  })
      .pipe(
        map(response => {
          ;
          return response.body;
        }));
  }

  //For All Languages
  getEventById(id: string): Observable<IEvent> {

    return this.http.get<IEvent>(this.baseUrl + 'events/' + id, { observe: 'response'  })
      .pipe(
        map(response => {
          ;
          return response.body;
        }));
  }

  addEvent(event: IEvent): any {
    return this.http.post(this.baseUrl + 'events', event);
  }

  updateEvent(event: IEvent): any {
    return this.http.put(this.baseUrl + 'events/' + event.id, event);
  }
}
