import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  searchPainting(searchString: string) {
    return this.http.get<any[]>(this.baseUrl + 'users/' + searchString);
  }
}
