import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {LocalStorageService} from '../../../services/localStorage.service';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {FirebaseuiAngularLibraryService, FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from 'firebaseui-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  messageError: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private localService: LocalStorageService,
              public auth: AngularFireAuth,
              private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService) {
    firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formLogin.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    this.userService.login(this.formLogin.value).subscribe(res => {
      if (res.status === 'OK') {
        console.log('Login success.');
        this.localService.set(res.data.username, res.data.accessToken);
        this.router.navigate(['/']);
      } else {
        this.messageError = res.message;
      }
    });

  }

  logout(): void {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult): void {
    const userProfile = signInSuccessData.authResult.additionalUserInfo.profile;
    const providerId = signInSuccessData.authResult.additionalUserInfo.providerId;
    console.log(providerId);
    // @ts-ignore
    this.userService.loginWithGoogle(userProfile.name, userProfile.email).subscribe(res => {
      console.log(res);
      if (res.status === 'OK') {
        console.log('Login success.');
        this.localService.set(res.data.username, res.data.accessToken);
        this.router.navigate(['/']);
      } else {
        this.messageError = res.message;
      }
    });
  }

  errorCallback(errorData: FirebaseUISignInFailure): void {
    console.log('errorCallback');
  }

  uiShownCallback(): void {
    console.log('uiShownCallback');
  }

}
