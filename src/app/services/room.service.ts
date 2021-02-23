import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Room} from '../models/room';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    })
  };

  /** GET hero by id. Will 404 if id not found */
  getRoom(id: number): Observable<Room> {
    const url = `http://localhost:8080/api/v1/rooms/${id}`;
    return this.http.get<Room>(`${environment.apiUrl}/rooms/${id}`, this.httpOptions).pipe(
      tap(_ => console.log(`fetched room id=${id}`)),
      catchError(this.handleError<Room>(`getRoom id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAll(): any {
    return this.http.get(`${environment.apiUrl}/rooms`, this.httpOptions);
  }

  save(room: any): any {
    return this.http.post(`${environment.apiUrl}/host`, room, this.httpOptions);
  }

  uploadMultiImage(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/upload', formData);
  }

  changeStatus(id: number): any {
    return this.http.put(`${environment.apiUrl}/host/${id}/status`, null, this.httpOptions);
  }

  cancelled(id: number, cancelled: boolean): Observable<any> {
    return this.http.put(`${environment.apiUrl}/rooms/${id}/cancelled`, {cancelled}, this.httpOptions);
  }
}
