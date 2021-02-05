import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListHomeService {

  constructor(private http: HttpClient) { }
  getAll(){
    return this.http.get('http://localhost:8080/api/v1/rooms');
  }
  findAllByCityId(id: number){
    return this.http.get('http://localhost:8080/api/v1/rooms/city/'+id);
  }
}
