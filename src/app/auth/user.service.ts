import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserProfile } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(user: UserProfile): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/api/users/login', user);
  }
}
