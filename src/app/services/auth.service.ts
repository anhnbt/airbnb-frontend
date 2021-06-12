import {Injectable} from '@angular/core';
import {LocalStorageService} from './localStorage.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {environment} from '../../environments/environment.prod';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated$ = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public user$: Observable<User> = this.isAuthenticated$.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private auth: AngularFireAuth
  ) {
  }

  async login(username: string, password: string): Promise<void> {
    this.isLoading$.next(true);
    const resp = await this.http.post<any>(`${environment.apiUrl}/auth/login`, {username, password}).toPromise();
    if (resp.status === 'OK') {
      this.isLoading$.next(false);
      this.isAuthenticated$.next(resp.data);
      this.saveLocalAndRedirect(resp.data);
    } else {
      this.isLoading$.next(false);
      throw Error(resp.message);
    }
  }

  async loginWithGoogle(name: string, email: string): Promise<any> {
    const resp = await this.http.post(`${environment.apiUrl}/auth/login-with-google`, {email, name})
      .toPromise() as any;
    console.log(resp);
    this.isAuthenticated$.next(resp.data);
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
    this.isAuthenticated$.next(null);
    this.router.navigate([redirect]);
  }

  checkAuthenticated(): boolean {
    return this.getUserFromLocalStorage() !== null;
  }

  saveLocalAndRedirect(user: object): void {
    this.localStorageService.set('airbnb_account', user);
    this.router.navigate(['/']);
  }

  getUserFromLocalStorage(): User {
    return this.localStorageService.get('airbnb_account');
  }

  getAuthorizationToken(): string {
    if (this.getUserFromLocalStorage()) {
      return this.getUserFromLocalStorage().token;
    } else {
      return null;
    }
  }

}
