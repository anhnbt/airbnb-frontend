import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RoomImageService {

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  save(image: any): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getAuthorizationToken()}`
      })
    };
    return this.http.post(`${environment.apiUrl}/images`, image, httpOptions);
  }
}
