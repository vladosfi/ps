import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_interfaces/pagination';
import { IPainting } from '../_interfaces/painting';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IPaintingDetails } from '../_interfaces/painting-details';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPaintings(page?, itemsPerPage?, paintingParams?): Observable<PaginatedResult<IPainting[]>> {
    const paginatedResult: PaginatedResult<IPainting[]> = new PaginatedResult<IPainting[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (paintingParams?.categoryId) {
      params = params.append('categoryId', paintingParams.categoryId);
    }

    if (paintingParams?.available) {
      params = params.append('available', paintingParams.available);
    }


    return this.http.get<IPainting[]>(this.baseUrl + 'paintings', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
          }
          return paginatedResult;
        }));
  }

  getPainting(id: string): Observable<IPaintingDetails> {   

    return this.http.get<IPaintingDetails>(this.baseUrl + 'paintings/' + id, { observe: 'response'})
    .pipe(
      map( response => {
        return response.body;
      })
    );
  }
}
