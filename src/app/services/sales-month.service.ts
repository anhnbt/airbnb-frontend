import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SalesMonthService {
  private URL = 'http://localhost:8080';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getSalesMonth(id: number, year: number): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getLocal().accessToken}`
      })
    };
    return this.http.get(this.URL + '/api/sales/' + id + '/' + year, httpOptions);
  }
}
