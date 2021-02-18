import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class  UserService {
  private url = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {
  }

  login(value: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/users/login', value);
  }

  getOne(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
  getOneByUsername(name: string): Observable<any> {
    return this.http.get(this.url + '/username' + name);
  }
  changePassword(login: any){
    return this.http.post('http://localhost:8080/api/user/changepw',login)
  }
  getRoomsOfHost(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id + '/rooms');
  }

  getBookingsOfUser(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id + '/bookings');
  }
}
