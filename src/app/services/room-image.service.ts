import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomImageService {
  private URL = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getLocal().accessToken}`
    })
  };

  save(image: any): any {
    return this.http.post(this.URL, image, this.httpOptions);
  }
}
