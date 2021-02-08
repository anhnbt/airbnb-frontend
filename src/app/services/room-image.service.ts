import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomImageService {
  private URL = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient) {
  }

  save(image: any): any {
    return this.http.post(this.URL, image);
  }
}
