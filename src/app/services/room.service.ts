import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Room} from '../models/room';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private URL = 'http://localhost:8080/api/v1/rooms';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getLocal().accessToken}`
    })
  };

  /** GET hero by id. Will 404 if id not found */
  getRoom(id: number): Observable<Room> {
    const url = `http://localhost:8080/api/v1/rooms/${id}`;
    return this.http.get<Room>(url).pipe(
      tap(_ => console.log(`fetched room id=${id}`)),
      catchError(this.handleError<Room>(`getRoom id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
    return this.http.get(this.URL);
  }

  save(room: any): any {
    // @ts-ignore
    return this.http.post('http://localhost:8080/api/host', room, this.httpOptions);
  }

  uploadMultiImage(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/upload', formData);
  }

  changeStatus(id: number): any {
    // @ts-ignore
    return this.http.put('http://localhost:8080/api/host' + '/' + id + '/status', null, this.httpOptions);
  }

  cancelled(id: number, cancelled: boolean): Observable<any> {
    return this.http.put(this.URL + '/' + id + '/cancelled', {cancelled});
  }
}
