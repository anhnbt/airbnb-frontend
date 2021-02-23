import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  findAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/province`, this.httpOptions);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/province/${id}`);
  }
}
