import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl + 'users');
  }

  getUser(id: number) {
    return this.http.get(this.baseUrl + 'users/' + id);
  }

  updateUsers(id: number, user: IUser){
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }
}

