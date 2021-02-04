import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListCityService {

  constructor(private http: HttpClient) { }
  getAllCity(){
    return this.http.get('http://localhost:8080/api/city');
  }
}
