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
import {LayoutLoginComponent} from './components/layout-login/layout-login.component';
import {LoginComponent} from './components/layout-login/login/login.component';
/**
 * Config cho firebase
 */
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment.prod';
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
import {HomeComponent} from './components/home/home.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogContentComponent} from './components/layout/dialog-content/dialog-content.component';
import {RoomDetailsComponent} from './components/room-details/room-details.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {CreatePostComponent} from './components/create-post/create-post.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {BookingListComponent} from './components/booking-list/booking-list.component';
import {BookingDetailsComponent} from './components/booking-details/booking-details.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import {ReviewComponent} from './components/review/review.component';
import {SliderModule} from 'angular-image-slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/layout-login/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    DialogContentComponent,
    RoomDetailsComponent,
    LayoutLoginComponent,
    LoginComponent,
    RoomDetailsComponent,
    CreatePostComponent,
    UserProfileComponent,
    BookingListComponent,
    BookingDetailsComponent,
    ReviewComponent,
    PageNotFoundComponent,
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
    HttpClientModule,
    SliderModule,
    MatTabsModule,
    MatStepperModule,
    MatExpansionModule,
    NgImageSliderModule,
    MatExpansionModule,
    NgbModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
