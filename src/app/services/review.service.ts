import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  getAll(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/review/room/${id}`);
  }

  save(reviewBody: string, rating: number, booking: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/review`, {reviewBody, rating, booking});
  }
}
