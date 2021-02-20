import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = 'http://localhost:8080/api/review';

  constructor(private http: HttpClient) {
  }

  getAll(id: number): Observable<any> {
    return this.http.get(this.url + '/room/' + id);
  }

  save(reviewBody: string, rating: number, booking: any): Observable<any> {
    return this.http.post(this.url, {reviewBody, rating, booking});
  }
}
