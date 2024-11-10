import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private BASE_API_PATH = 'https://jsonplaceholder.typicode.com';

  getUsers() {
    return this.http.get<IUser[]>(this.BASE_API_PATH + '/users');
  }

  getUserDetails(id: number) {
    return this.http.get<IUser>(this.BASE_API_PATH + `/users/${id}`);
  }
}
