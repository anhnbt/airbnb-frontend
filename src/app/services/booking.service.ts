import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/bookings`, this.httpOptions);
  }

  getOne(id: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/bookings/${id}`, this.httpOptions);
  }

  cancelled(id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/bookings/${id}/cancelled`, null, this.httpOptions);
  }

  booking(roomId: number, userId: number, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/bookings/${roomId}/${userId}`, data, this.httpOptions);
  }

  getBookingByRoomAndByUser(roomId: number, userId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getLocal().accessToken}`
      })
    };
    return this.http.get(`${environment.apiUrl}/bookings/${roomId}/${userId}`, this.httpOptions);
  }

  bookingsOfCus(userId: number): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getLocal().accessToken}`
      })
    };
    return this.http.get(`${environment.apiUrl}/bookings/user/${userId}`, this.httpOptions);  }
}
