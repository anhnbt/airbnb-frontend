import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private url = 'http://localhost:8080/api/user';
  constructor(private http: HttpClient) {
  }

  login(value: any): Observable<any>{
    return this.http.post(this.url, value);
  }
}

