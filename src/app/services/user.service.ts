import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {User} from '../models/user';
import {Response} from '../models/response';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {
  }

  create(user: User): Observable<Response> {
    console.log('User', user);
    return this.http.post<Response>(`${environment.apiUrl}/auth/register`, user);
  }

  update(value: any, id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/${id}`, value);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
  }

  findByUsername(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${username}`);
  }

  changePassword(userForm: any, id: number): any {
    return this.http.put(`${environment.apiUrl}/users/${id}`, userForm);
  }

  findRoomByUserId(id: number, page?: number, size?: number): Observable<any> {
    if (page || size) {
      return this.http.get(`${environment.apiUrl}/users/${id}/rooms?page=${page}&size=${size}`);
    }
    return this.http.get(`${environment.apiUrl}/users/${id}/rooms`);
  }

  findBookingByUserId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}/bookings`);
  }

}
