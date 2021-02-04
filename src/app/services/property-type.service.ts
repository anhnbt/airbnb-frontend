import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypeService {

  private URL = 'http://localhost:8080/api/propertyType';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.URL);
  }

  getOne(id: number): Observable<any> {
    return this.http.get(this.URL + '/' + id);
  }
}
