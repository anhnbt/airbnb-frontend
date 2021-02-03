import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private URL = 'http://localhost:8080/api/homes';

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get(this.URL);
  }

  save(product: any): any {
    return this.http.post(this.URL, product);
  }
}
