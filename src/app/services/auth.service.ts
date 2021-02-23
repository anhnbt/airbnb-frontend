import {Injectable} from '@angular/core';
import {LocalStorageService} from './localStorage.service';
import {HttpClient} from '@angular/common/http';
import {Account} from '../models/account';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private auth: AngularFireAuth
  ) {
  }

  async login(username: string, password: string): Promise<any> {
    const resp = await this.http.post(`${environment.apiUrl}/auth/login`, {username, password})
      .toPromise() as any;
    this.isAuthenticated.next(true);
    if (resp.status !== 'OK') {
      throw Error('We cannot handle the ' + resp.status + ' status');
    }
    this.saveLocalAndRedirect(resp.data);
  }

  async loginWithGoogle(name: string, email: string): Promise<any> {
    const resp = await this.http.post(`${environment.apiUrl}/auth/login-with-google`, {email, name})
      .toPromise() as any;
    console.log(resp);
    this.isAuthenticated.next(true);
    if (resp.status !== 'OK') {
      throw Error('We cannot handle the ' + resp.status + ' status');
    }
    this.saveLocalAndRedirect(resp.data);
  }

  logout(redirect: string): void {
    this.localStorageService.delete('airbnb_account');
    if (this.auth.user) {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
    this.isAuthenticated.next(false);
    this.router.navigate([redirect]);
  }

  checkAuthenticated(): boolean {
    const user = this.localStorageService.get('airbnb_account');
    let authenticated = false;
    if (user && typeof user === 'object') {
      authenticated = true;
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
    if (this.getLocal()) {
      return this.getLocal().accessToken;
    } else {
      return null;
    }
  }

}
