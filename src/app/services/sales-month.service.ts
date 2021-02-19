import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesMonthService {
  private URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getSalesMonth(id: number, year: number): any {
    return this.http.get(this.URL + '/api/sales/' + id + '/' + year);
  }
}
