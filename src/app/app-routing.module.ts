import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/room-list/home.component';
import {RoomDetailsComponent} from './components/room-details/room-details.component';
import {BookingDetailsComponent} from './components/booking-details/booking-details.component';
import {ReviewComponent} from './components/review/review.component';
import {ProfileComponent} from './components/users/profile.component';
import {CreatePostComponent} from './components/users/create-post/create-post.component';
import {EditProfileComponent} from './components/users/edit-profile/edit-profile.component';
import {ChangePassComponent} from './components/users/change-password/change-pass.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuard} from './components/auth/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'change-password', component: ChangePassComponent, canActivate: [AuthGuard]},
  {path: 'review', component: ReviewComponent},
  {path: 'rooms/:id', component: RoomDetailsComponent},
  {path: 'booking-detail/:id', component: BookingDetailsComponent},
  {path: 'users/profile', component: ProfileComponent},
  {path: 'users/edit', component: EditProfileComponent},
  {path: 'users/create-post', component: CreatePostComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
