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

  cancelBooking(id: any, timestamp: any): any {
    // @ts-ignore
    return this.http.put(this.URL + '/' + id + '/cancel', {'localDateTime': timestamp});
  }

  booking(roomId: number, userId: number, data: any): any {
    return this.http.post(this.URL + '/' + roomId + '/' + userId, data);
  }

  getBookingByRoomAndByUser(room_id, user_id): Observable<any> {
    return this.http.get(this.URL + `/${room_id}/${user_id}`);
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
