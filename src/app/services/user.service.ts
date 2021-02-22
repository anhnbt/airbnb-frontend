import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../models/account';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  login(value: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/users/login', value);
  }

  createUser(value: any): Observable<any>{
    return this.http.post('http://localhost:8080/api/v1/users/register', value);
  }

  editUser(value: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/user/edit', value);
  }

  getOne(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getLocal().accessToken}`
      })
    };
    return this.http.get(this.url + '/' + id, httpOptions);
  }

  getOneByUsername(name: string): Observable<any> {
    return this.http.get(this.url + '/edit-user/' + name);
  }

  changePassword(login: any): any {
    return this.http.post('http://localhost:8080/api/user/changepw', login);
  }

  getRoomsOfHost(id: number, page?: number, size?: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getLocal().accessToken}`
      })
    };
    if (page || size) {
      return this.http.get(`${this.url}/${id}/rooms?page=${page}&size=${size}`, httpOptions);
    }
    return this.http.get(this.url + '/' + id + '/rooms', httpOptions);
  }

  getBookingsOfUser(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getLocal().accessToken}`
      })
    };
    return this.http.get(this.url + '/' + id + '/bookings', httpOptions);
  }

  loginWithGoogle(name: string, email: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/users/login-with-google', {email, name});
  }

  getUser(username: string): Observable<any> {
    return this.http.get(`${this.url}/${username}`);
  }
}
