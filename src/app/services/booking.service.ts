import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private URL = 'http://localhost:8080/api/v1/bookings';

  constructor(private http: HttpClient) {
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
}
