import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = 'http://localhost:8080/api/review';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getAll(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getLocal().accessToken}`
      })
    };
    // @ts-ignore
    return this.http.get(`${environment.apiUrl}/review/room/${id}`, httpOptions);
  }

  save(reviewBody: string, rating: number, booking: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getLocal().accessToken}`
      })
    };
    return this.http.post(`${environment.apiUrl}/review`, {reviewBody, rating, booking}, httpOptions);
  }
}
