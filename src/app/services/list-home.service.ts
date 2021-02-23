import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ListHomeService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/rooms`);
  }

  findAllByProvinceId(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/rooms/province/${id}`);
  }

  findAllByAddress(address: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/rooms/address/${address}`);
  }
}
