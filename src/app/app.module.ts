import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponent} from './components/layout/layout.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HomeComponent} from './components/room-list/home.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogContentComponent} from './components/layout/dialog-content/dialog-content.component';
import {RoomDetailsComponent} from './components/room-details/room-details.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProfileComponent} from './components/users/profile.component';
import {EditProfileComponent} from './components/users/edit-profile/edit-profile.component';
import {CreatePostComponent} from './components/users/create-post/create-post.component';
import {ChangePassComponent} from './components/users/change-password/change-pass.component';
import {BookingListComponent} from './components/booking-list/booking-list.component';
import {BookingDetailsComponent} from './components/booking-details/booking-details.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import {ReviewComponent} from './components/review/review.component';
import {SliderModule} from 'angular-image-slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgImageSliderModule} from 'ng-image-slider';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NzNotificationModule} from 'ng-zorro-antd/notification';

/**
 * Config cho firebase
 */
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment.prod';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/auth';
import {LineChartRevenueComponent} from './components/line-chart-revenue/line-chart-revenue.component';
import {DialogInputComponent} from './components/layout/dialog-input/dialog-input.component';
import {DialogUpdateComponent} from './components/booking-details/dialog-update/dialog-update.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {AuthInterceptor} from './components/http-interceptors/auth.interceptor';
import {LayoutLoginComponent} from './components/auth/layout-login.component';
import {LoadingComponent} from './components/auth/loading/loading.component';
import {LoginComponent} from './components/auth/login/login.component';
import {NavBarComponent} from './components/auth/nav-bar/nav-bar.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {NzSpinModule} from 'ng-zorro-antd/spin';

registerLocaleData(en);

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        auth_type: 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    }
  ],
  tosUrl: 'https://anhnbt.com/p/dieu-khoan-su-dung.html',
  privacyPolicyUrl: 'https://anhnbt.com/p/chinh-sach-bao-mat.html',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    DialogContentComponent,
    RoomDetailsComponent,
    RoomDetailsComponent,
    CreatePostComponent,
    ProfileComponent,
    BookingListComponent,
    BookingDetailsComponent,
    ReviewComponent,
    PageNotFoundComponent,
    LineChartRevenueComponent,
    PageNotFoundComponent,
    ChangePassComponent,
    EditProfileComponent,
    DialogInputComponent,
    DialogUpdateComponent,
    LayoutLoginComponent,
    LoadingComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    MatAutocompleteModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireStorageModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    SliderModule,
    MatTabsModule,
    MatStepperModule,
    MatExpansionModule,
    NgImageSliderModule,
    MatExpansionModule,
    NgbModule,
    MatSlideToggleModule,
    NzNotificationModule,
    NzSpinModule,
  ],
  providers: [
    MatDatepickerModule, {
      provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 9099] : undefined
    },
    {provide: NZ_I18N, useValue: en_US},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
