import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  create(value: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, value);
  }

  update(value: any, id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/users/${id}`, value, this.httpOptions);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}`, this.httpOptions);
  }

  findByUsername(username: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${username}`, this.httpOptions);
  }

  changePassword(userForm: any, id: number): any {
    return this.http.put(`${environment.apiUrl}/users/${id}`, userForm, this.httpOptions);
  }

  findRoomByUserId(id: number, page?: number, size?: number): Observable<any> {
    if (page || size) {
      return this.http.get(`${environment.apiUrl}/users/${id}/rooms?page=${page}&size=${size}`, this.httpOptions);
    }
    return this.http.get(`${environment.apiUrl}/users/${id}/rooms`, this.httpOptions);
  }

  findBookingByUserId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}/bookings`, this.httpOptions);
  }

}
