import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private URL = 'http://localhost:8080/api/city';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.URL);
  }

  getOne(id: number): Observable<any> {
    return this.http.get(this.URL + '/' + id);
  }
}
