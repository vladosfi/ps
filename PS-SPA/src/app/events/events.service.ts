import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IEvent } from '../shared/_interfaces/Event';
import { PaginatedResult } from '../_interfaces/pagination';

@Injectable()
export class EventsService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }


  getEvents(page?, itemsPerPage?, paintingParams?): Observable<PaginatedResult<IEvent[]>>  {

    const paginatedResult: PaginatedResult<IEvent[]> = new PaginatedResult<IEvent[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

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
}
