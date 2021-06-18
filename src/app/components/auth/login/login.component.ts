import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {LocalStorageService} from '../../../services/localStorage.service';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {
  FirebaseuiAngularLibraryService,
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult
} from 'firebaseui-angular';
import {AuthService} from '../../../services/auth.service';
import {ShareService} from '../../../services/share.service';
import {NotificationService} from '../../shared/notification.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auth: AuthService,
    private shareService: ShareService,
    private localService: LocalStorageService,
    private notificationService: NotificationService,
    public fireAuth: AngularFireAuth,
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService) {
    firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.auth.isAuthenticated$.subscribe((user: User) => {
      if (user) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.formLogin.valid) {
      try {
        const username = this.formLogin.get('username').value;
        const password = this.formLogin.get('password').value;
        await this.auth.login(username, password);
      } catch (err) {
        this.loginInvalid = true;
        this.notificationService.createNotification('error', 'AirBnb', err.message);
      }
    } else {
      this.formSubmitAttempt = true;
    }

  }

  logout(): void {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  async successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult): Promise<void> {
    const userProfile = signInSuccessData.authResult.additionalUserInfo.profile;
    const providerId = signInSuccessData.authResult.additionalUserInfo.providerId;
    console.log(providerId);
    try {
      // @ts-ignore
      await this.auth.loginWithGoogle(userProfile.name, userProfile.email);
    } catch (err) {
      this.loginInvalid = true;
    }
  }

  errorCallback(errorData: FirebaseUISignInFailure): void {
    console.log('errorCallback');
  }

  uiShownCallback(): void {
    console.log('uiShownCallback');
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.formLogin.controls[controlName].hasError(errorName);
  }

}
