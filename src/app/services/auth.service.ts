import {Injectable} from '@angular/core';
import {LocalStorageService} from './localStorage.service';
import {HttpClient} from '@angular/common/http';
import {Account} from '../models/account';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  async login(username: string, password: string): Promise<any> {
    const resp = await this.http.post('http://localhost:8080/api/v1/users/login', {username, password})
      .toPromise() as any;
    console.log(resp);
    this.isAuthenticated.next(true);
    if (resp.status !== 'OK') {
      throw Error('We cannot handle the ' + resp.status + ' status');
    }
    this.saveLocalAndRedirect(resp.data);
  }

  loginWithGoogle(name: string, email: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/users/login-with-google', {email, name});
  }

  logout(redirect: string): void {
    this.localStorageService.delete('airbnb_account');
    this.isAuthenticated.next(false);
    this.router.navigate([redirect]);
  }

  isLogin(): boolean {
    const user = this.localStorageService.get('airbnb_account');
    if (user && typeof user === 'object') {
      return user.id && user.username && user.accessToken;
    }
    return false;
  }

  checkAuthenticated(): boolean {
    const user = this.localStorageService.get('airbnb_account');
    let authenticated = false;
    if (user && typeof user === 'object') {
      authenticated = (user.id && user.username && user.accessToken);
    }
    this.isAuthenticated.next(authenticated);
    return authenticated;
  }

  saveLocalAndRedirect(account: Account): void {
    this.localStorageService.set('airbnb_account', account);
    this.router.navigate(['/']);
  }

  getLocal(): Account {
    return this.localStorageService.get('airbnb_account');
  }

  getToken(): string {
    const user = this.getLocal();
    return user ? user.accessToken : null;
  }

}
