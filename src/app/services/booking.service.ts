import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private URL = 'http://localhost:8080/api/v1/bookings';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getAll(): any {
    return this.http.get(this.URL);
  }

  getOne(id: any): any {
    return this.http.get(this.URL + '/' + id);
  }

  cancelled(id: number): Observable<any> {
    // @ts-ignore
    return this.http.put(this.URL + '/' + id + '/cancelled');
  }

  booking(roomId: number, userId: number, data: any): Observable<any> {
    return this.http.post(this.URL + '/' + roomId + '/' + userId, data);
  }

  getBookingByRoomAndByUser(roomId: number, userId: number): Observable<any> {
    return this.http.get(this.URL + `/${roomId}/${userId}`);
  }


  bookingsOfCus(userId: number): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getLocal().accessToken}`
      })
    };
    return this.http.get(this.URL + '/user/' + userId, httpOptions);
  }
}
