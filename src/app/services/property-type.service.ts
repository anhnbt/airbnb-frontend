import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PropertyTypeService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/propertyType`);
  }

  getOne(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/propertyType/${id}`);
  }
}
